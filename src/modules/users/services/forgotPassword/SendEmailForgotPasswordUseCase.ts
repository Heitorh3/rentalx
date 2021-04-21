import path from 'path';
import { add } from 'date-fns';

import { injectable, inject } from "tsyringe";

import authConfig from '@config/auth';

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

    console.log(JSON.stringify(userExists, null, 2));

    if (!userExists) {
      throw new AppError('User does not exists.');
    }

    const { token, refresh_token } = await this.userTokenRepository.findByUser(userExists);

    if (token) {
      this.userTokenRepository.delete(token);
    }

    const { expiresIn_access_token } = authConfig.access_token;

    const newToken = await this.userTokenRepository.generate({
      user_id: userExists.id,
      expires_date: add(new Date(),
        {
          days: Number(expiresIn_access_token)
        }),
      refresh_token
    });

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
          link: `${process.env.APP_WEB_URL}/reset-password?token=${newToken.token}`,
        },
      },
    });
  }
}
export { SendEmailForgotPasswordUseCase }
