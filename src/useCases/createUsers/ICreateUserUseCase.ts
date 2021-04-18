import User from '@modules/users/entities/User';
import ICreateUserRequestDTO from './ICreateUserRequestDTO';

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<User>
}
