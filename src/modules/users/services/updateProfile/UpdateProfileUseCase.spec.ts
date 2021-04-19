import "reflect-metadata"
import AppError from '@shared/infra/errors/AppError';

import { UpdateProfileUseCase } from './UpdateProfileUseCase'

import FakeUserRepository from "@modules/users/infra/typeorm/repositories/implementations/fakes/FakeUserRepository";
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeLoggerProvider from '@shared/container/providers/LoggerProvider/fakes/FakeLoggerProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileUseCase;
let fakeCacheProvider: FakeCacheProvider;
let fakeLoggerProvider: FakeLoggerProvider;

describe('Update profile ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    fakeLoggerProvider = new FakeLoggerProvider();

    updateProfile = new UpdateProfileUseCase(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
      fakeLoggerProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe 1',
      email: 'johndoe@hotmail.com',
      cpf: '68235321068'
    });

    expect(updatedUser.name).toBe('Jhon Doe 1');
    expect(updatedUser.email).toBe('johndoe@hotmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jhon Week',
      email: 'johnweek@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'johndoe@gmail.com',
        cpf: '68235321068',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'johndoe@gmail.com',
        cpf: '68235321068',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the cpf with empty value', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'johndoe@gmail.com',
        cpf: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the e-mail with empty value', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: '',
        cpf: '68235321068'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrond old password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'johndoe@gmail.com',
        cpf: '68235321068',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user from non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Jhon Doe',
        email: 'johndoe@gmail.com',
        cpf: '68235321068',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
