import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import User from "../infra/typeorm/entities/User";
import UserToken from "../infra/typeorm/entities/UserToken";

export interface IUserTokenRepository {
  generate({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  findByUser(user: User): Promise<UserToken | undefined>;
  delete(token: string): Promise<void>;
}
