import User from '@modules/users/infra/typeorm/entities/User';
import IUpdateProfileRequestDTO from '../../dtos/IUpdateProfileRequestDTO';

export interface IUpdateProfileUseCase {
  execute(data: IUpdateProfileRequestDTO): Promise<User | undefined>
}
