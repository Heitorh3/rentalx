import { getRepository, Repository } from "typeorm";

import { IUserTokenRepository } from "@modules/users/repositories/IUserTokenRepository";
import UserToken from "../../entities/UserToken";
import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import User from "../../entities/User";

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create(
      {
        user_id,
        refresh_token,
        expires_date
      }
    );

    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne(
      {
        where: { token }
      })

    return userToken;
  }

  public findByUser(user: User): Promise<UserToken> {
    const userToken = this.ormRepository
      .createQueryBuilder("user_tokens")
      .leftJoinAndSelect("user_tokens.user", "user")
      .where({ user: user })
      .getOne();

    return userToken;
  }

  public async delete(token: string): Promise<void> {
    this.ormRepository
      .createQueryBuilder("user_tokens")
      .delete()
      .from(UserToken)
      .where({ token })
      .execute()
  }
}

export { UserTokenRepository }
