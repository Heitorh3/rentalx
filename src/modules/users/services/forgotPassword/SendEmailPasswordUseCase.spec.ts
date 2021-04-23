import "reflect-metadata"
import AppError from '@shared/infra/errors/AppError';

import { SendEmailForgotPasswordUseCase } from './SendEmailForgotPasswordUseCase';

import FakeUserRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUsersTokensRepository";
import FakeLoggerProvider from '@shared/container/providers/LoggerProvider/fakes/FakeLoggerProvider';
import FakeMailProvider from "@shared/container/providers/EmailProvider/fakes/FakeMailProvider";

let fakeUsersRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;

let fakeUserTokensRepository: FakeUserTokensRepository;
let sendEmailForgotPasswordUseCase: SendEmailForgotPasswordUseCase;
let fakeLoggerProvider: FakeLoggerProvider;

describe('Send Forgot Password E-mail ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeLoggerProvider = new FakeLoggerProvider();

    sendEmailForgotPasswordUseCase = new SendEmailForgotPasswordUseCase(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
      fakeLoggerProvider
    );
  });

  it('should be able to recovery the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '23675496309',
      password: '123456',
    });

    await sendEmailForgotPasswordUseCase.execute({ email: 'johndoe@gmail.com' });

    expect(sendMail).toHaveBeenCalled();

  });

  it('it should not be possible to receive a recovery email without ever having logged in', async () => {
    await expect(
      sendEmailForgotPasswordUseCase.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to recovery a non-existing user password', async () => {
    await expect(
      sendEmailForgotPasswordUseCase.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      cpf: '25525081202',
      password: '123456',
    });

    await sendEmailForgotPasswordUseCase.execute({ email: 'johndoe@gmail.com' });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
