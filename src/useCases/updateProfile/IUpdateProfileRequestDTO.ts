export default interface IUpdateProfileRequestDTO {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}
