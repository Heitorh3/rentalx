import { User } from '@modules/users/entities/User';
import IUpdateProfileRequestDTO from './IUpdateProfileRequestDTO';

export interface IUpdateProfileUseCase {
  execute(data: IUpdateProfileRequestDTO): Promise<User | undefined>
}
