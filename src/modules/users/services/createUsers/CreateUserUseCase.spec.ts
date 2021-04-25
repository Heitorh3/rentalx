import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeLoggerProvider from '@shared/container/providers/LoggerProvider/fakes/FakeLoggerProvider';
import AppError from '@shared/infra/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let fakeLoggerProvider: FakeLoggerProvider;

describe('Create user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeLoggerProvider = new FakeLoggerProvider();

    createUserUseCase = new CreateUserUseCase(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
      fakeLoggerProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        cpf: '81066081662',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with same cpf from another', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'john_doe@gmail.com',
        cpf: '68235321068',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
