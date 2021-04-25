import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeLoggerProvider from '@shared/container/providers/LoggerProvider/fakes/FakeLoggerProvider';
import AppError from '@shared/infra/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';

import { ResetPasswordUseCase } from './ResetPasswordUseCase';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordUseCase;
let fakeLoggerProvider: FakeLoggerProvider;

describe('Reset Password ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeLoggerProvider = new FakeLoggerProvider();

    resetPassword = new ResetPasswordUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
      fakeLoggerProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({ token, password: 'new-password' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('new-password');
    expect(generateHash).toHaveBeenCalledWith('new-password');
  });

  it('should not be able to reset the password with non-exiting token ', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-exiting user ', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );
    await expect(
      resetPassword.execute({
        token,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more the 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '68235321068',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custonDate = new Date();

      return custonDate.setHours(custonDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: 'new-password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
