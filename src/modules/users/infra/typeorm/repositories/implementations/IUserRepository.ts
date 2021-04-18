import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserRequestDTO from '@modules/users/dtos/ICreateUserRequestDTO';

export interface IUserRepository {
  findById(user_id: string): Promise<User | undefined>,
  findByEmail(email: string): Promise<User | undefined>,
  findByCpf(cpf: string): Promise<User | undefined>,
  create(userData: ICreateUserRequestDTO): Promise<User>;
  save(user: User): Promise<User>;
}
