import "reflect-metadata"
import AppError from '@shared/infra/errors/AppError';

import { ResetPasswordUseCase } from './ResetPasswordUseCase'

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUsersTokensRepository";
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeLoggerProvider from '@shared/container/providers/LoggerProvider/fakes/FakeLoggerProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordUseCase;
let fakeCacheProvider: FakeCacheProvider;
let fakeLoggerProvider: FakeLoggerProvider;

describe('Reset Password ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    fakeLoggerProvider = new FakeLoggerProvider();

    resetPassword = new ResetPasswordUseCase(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
      fakeLoggerProvider
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
  })
});
