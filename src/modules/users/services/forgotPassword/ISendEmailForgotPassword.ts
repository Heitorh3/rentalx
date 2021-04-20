import { ISendEmailPasswordRequestDTO } from "@modules/users/dtos/ISendEmailPasswordRequestDTO";

export interface ISendEmailForgotPassword {
  execute(data: ISendEmailPasswordRequestDTO): Promise<void>;
}
