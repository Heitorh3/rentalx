import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';

import IUpdateProfileRequestDTO from "../../dtos/IUpdateProfileRequestDTO";
import { IUpdateProfileUseCase } from "./IUpdateProfileUseCase";

import { IUserRepository } from '@modules/users/infra/typeorm/repositories/implementations/IUserRepository';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import LoggerProvider from "@shared/container/providers/LoggerProvider/models/ILoggerProvider";

import AppError from '@shared/infra/errors/AppError';

@injectable()
class UpdateProfileUseCase implements IUpdateProfileUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('LoggerProvider')
    private loggerProvider: LoggerProvider,
  ) { }

  public async execute({
    user_id,
    name,
    email,
    cpf,
    password,
    old_password }: IUpdateProfileRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (!cpf || !email) {
      throw new AppError(
        'You need to inform the cpf and email address.',
      );
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }
    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        this.loggerProvider.log('warn', 'Old password does not match', {
          messageID: old_password,
        });

        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);

      this.loggerProvider.log('info', `Password change from [${user.name}]`, {
        messageID: user.id,
      });
    }

    user.name = name;
    user.email = email;
    user.cpf = cpf;

    await this.cacheProvider.invalidatePrefix('users-list');
    return await this.userRepository.save(user);
  }
}

export { UpdateProfileUseCase }
