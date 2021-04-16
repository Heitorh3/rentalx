import ICreateUserRequestDTO from './ICreateUserRequestDTO';

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<void>
}
