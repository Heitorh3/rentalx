import IResetPasswordRequestDTO from '@modules/users/dtos/IResetPasswordRequestDTO';

export interface IResetPasswordUseCase {
  execute(data: IResetPasswordRequestDTO): Promise<void>;
}
