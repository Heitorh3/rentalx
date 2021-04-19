import User from "../infra/typeorm/entities/User";

export default interface IResposeUserDTO {
  user: User;
  token: string;
}
