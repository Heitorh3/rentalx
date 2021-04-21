import { injectable, inject } from "tsyringe";
import { add } from 'date-fns';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import IAthenticateUserRequestDTO from "@modules/users/dtos/IAthenticateUserRequestDTO";
import IResponseUserDTO from "@modules/users/dtos/IResponseUserDTO";
import { IAthenticateUserUseCase, } from "./IAthenticateUserUseCase";

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
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

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) { }

  public async execute({ cpf, password }: IAthenticateUserRequestDTO): Promise<IResponseUserDTO> {
    const user = await this.userRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Incorrect cpf and password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect cpf and password combination', 401);
    }

    const { secret_access_token, expiresIn_access_token } = authConfig.access_token;

    const access_token = sign({ id: user.id },
      secret_access_token,
      {
        expiresIn: expiresIn_access_token,
      });

    const { secret_refresh_token, expiresIn_refresh_token } = authConfig.refresh_token;

    const refresh_token = sign({ id: user.id },
      secret_refresh_token,
      {
        expiresIn: expiresIn_refresh_token
      });

    await this.userTokenRepository.generate({
      user_id: user.id,
      expires_date: add(new Date(),
        {
          days: Number(expiresIn_refresh_token)
        }),
      refresh_token
    });

    const responseToken: IResponseUserDTO = {
      access_token,
      user,
      refresh_token
    }

    this.loggerProvider.log('info', `User [${user.name}] logged success`, {
      messageID: user.id,
    });

    return responseToken;
  }
}

export { AuthenticateUserUseCase }
