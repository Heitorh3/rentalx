import { ICreateCategoryRequestDTO } from '../../dtos/ICreateCategoryRequestDTO';

export interface ICreateCategoryUseCase {
  execute(data: ICreateCategoryRequestDTO): Promise<void>
}
