import IAthenticateUserRequestDTO from "@modules/users/dtos/IAthenticateUserRequestDTO";
import IResposeUserDTO from "@modules/users/dtos/IResponseUserDTO";

export interface IAthenticateUserUseCase {
  execute(data: IAthenticateUserRequestDTO): Promise<IResposeUserDTO>;
}
