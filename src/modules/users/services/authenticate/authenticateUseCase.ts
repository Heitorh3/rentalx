import { injectable, inject } from "tsyringe";

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import IAthenticateUserRequestDTO from "@modules/users/dtos/IAthenticateUserRequestDTO";
import IResponseUserDTO from "@modules/users/dtos/IResponseUserDTO";
import { IAthenticateUserUseCase, } from "./IAthenticateUserUseCase";

import { IUserRepository } from '@modules/users/infra/typeorm/repositories/implementations/IUserRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import LoggerProvider from '@shared/container/providers/LoggerProvider/models/ILoggerProvider';
import AppError from '@shared/infra/errors/AppError';

@injectable()
class AuthenticateUserUseCase implements IAthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('LoggerProvider')
    private loggerProvider: LoggerProvider,
  ) { }

  public async execute({ cpf, password }: IAthenticateUserRequestDTO): Promise<IResponseUserDTO> {
    const user = await this.userRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Incorrect email and password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email and password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    this.loggerProvider.log('info', `User [${user.name}] logged success`, {
      messageID: user.id,
    });

    return {
      token: sign({ id: user.id }, secret, {
        expiresIn,
      }),
      user,
    };
  }
}

export { AuthenticateUserUseCase }
