import { ICreateCategoryRequestDTO } from './ICreateCategoryRequestDTO';

export interface ICreateCategoryUseCase {
  execute(data: ICreateCategoryRequestDTO): Promise<void>
}
