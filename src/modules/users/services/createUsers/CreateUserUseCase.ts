import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import LoggerProvider from '@shared/container/providers/LoggerProvider/models/ILoggerProvider';
import AppError from '@shared/infra/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/users/infra/typeorm/repositories/implementations/IUserRepository';

import ICreateUserRequestDTO from '../../dtos/ICreateUserRequestDTO';
import { ICreateUserUseCase } from './ICreateUserUseCase';

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

  public async execute({
    name,
    email,
    cpf,
    password,
  }: ICreateUserRequestDTO): Promise<User> {
    const checkUserExistsByEmail = await this.userRepository.findByEmail(email);

    const checkUserExistsByCpf = await this.userRepository.findByCpf(cpf);

    if (checkUserExistsByEmail) {
      throw new AppError('Email address already exists');
    }

    if (checkUserExistsByCpf) {
      throw new AppError('Cpf already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    });

    this.loggerProvider.log('info', `User [${user.name}] added to database`, {
      messageID: user.id,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}

export { CreateUserUseCase };
