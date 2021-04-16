import { injectable, inject } from 'tsyringe';

import ICreateUserRequestDTO from "./ICreateUserRequestDTO";
import { ICreateUserUseCase } from "./ICreateUserUseCase";

import { IUserRepository } from '@repositories/implementations/users/IUserRepository';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import LoggerProvider from "@shared/container/providers/LoggerProvider/models/LoggerProvider";

import AppError from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase implements ICreateUserUseCase {

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

  public async execute({ name, email, password }: ICreateUserRequestDTO): Promise<void> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    this.loggerProvider.log('info', `User [${user.name}] added to database`, {
      messageID: user.id,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
  }
}

export { CreateUserUseCase }
