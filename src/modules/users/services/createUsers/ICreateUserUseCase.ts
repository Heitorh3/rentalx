import ICreateUserRequestDTO from '@modules/users/dtos/ICreateUserRequestDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<User>;
}
