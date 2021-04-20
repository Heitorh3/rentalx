import path from 'path';
import { injectable, inject } from "tsyringe";

import { ISendEmailPasswordRequestDTO } from "@modules/users/dtos/ISendEmailPasswordRequestDTO";
import { ISendEmailForgotPassword } from "./ISendEmailForgotPassword";

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import LoggerProvider from '@shared/container/providers/LoggerProvider/models/ILoggerProvider';

import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import IMailProvider from "@shared/container/providers/EmailProvider/model/IMailProvider";

import AppError from '@shared/infra/errors/AppError';

@injectable()
class SendEmailForgotPasswordUseCase implements ISendEmailForgotPassword {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('LoggerProvider')
    private loggerProvider: LoggerProvider,
  ) { }

  public async execute({ email }: ISendEmailPasswordRequestDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokenRepository.generate(userExists.id);

    const fogotPasswodTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    this.loggerProvider.log(
      'info',
      `Revocer password from [${userExists.name}]`,
      {
        messageID: userExists.id,
      },
    );

    await this.mailProvider.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[RENTALX]Recuperação de senha',
      templateData: {
        file: fogotPasswodTemplate,
        variables: {
          name: userExists.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
export { SendEmailForgotPasswordUseCase }
