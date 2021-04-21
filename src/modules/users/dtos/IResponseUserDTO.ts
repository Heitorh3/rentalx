import User from "../infra/typeorm/entities/User";

export default interface IResposeUserDTO {
  user: User;
  access_token: string;
  refresh_token: string;
}
