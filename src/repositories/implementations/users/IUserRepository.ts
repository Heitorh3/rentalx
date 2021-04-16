import ICreateUserRequestDTO from '@useCases/createUsers/ICreateUserRequestDTO';
import { User } from '@modules/users/entities/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>,
  create(userData: ICreateUserRequestDTO): Promise<User>;
  save(user: User): Promise<User>;
}
