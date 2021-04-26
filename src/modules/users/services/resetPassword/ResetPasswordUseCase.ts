import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import LoggerProvider from '@shared/container/providers/LoggerProvider/models/ILoggerProvider';
import AppError from '@shared/infra/errors/AppError';

import IResetPasswordRequestDTO from '@modules/users/dtos/IResetPasswordRequestDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';

import { IResetPasswordUseCase } from './IResetPasswordUseCase';

@injectable()
class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('LoggerProvider')
    private loggerProvider: LoggerProvider,
  ) {}

  public async execute({
    token,
    password,
  }: IResetPasswordRequestDTO): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exists.');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    this.loggerProvider.log('info', `Password updated from [${user.name}]`, {
      messageID: user.id,
    });

    await this.userRepository.save(user);
  }
}

export { ResetPasswordUseCase };
