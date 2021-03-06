import 'reflect-metadata';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeLoggerProvider from '@shared/container/providers/LoggerProvider/fakes/FakeLoggerProvider';
import AppError from '@shared/infra/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';

import { AuthenticateUserUseCase } from './authenticateUseCase';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fackeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserUseCase;
let fakeLoggerProvider: FakeLoggerProvider;

describe('Authenticate User ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fackeHashProvider = new FakeHashProvider();
    fakeLoggerProvider = new FakeLoggerProvider();

    authenticateUser = new AuthenticateUserUseCase(
      fakeUsersRepository,
      fackeHashProvider,
      fakeLoggerProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    const reponse = await authenticateUser.execute({
      cpf: '68235321068',
      password: '123456',
    });

    expect(reponse).toHaveProperty('token');
    expect(reponse.user).toBe(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        cpf: '68235321068',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        cpf: '68235321068',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
