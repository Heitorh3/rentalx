import ICreateUserRequestDTO from '@useCases/createUsers/ICreateUserRequestDTO';
import { User } from '@modules/users/entities/User';

export interface IUserRepository {
  findById(user_id: string): Promise<User | undefined>,
  findByEmail(email: string): Promise<User | undefined>,
  create(userData: ICreateUserRequestDTO): Promise<User>;
  save(user: User): Promise<User>;
}
