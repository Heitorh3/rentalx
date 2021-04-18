export default interface IUpdateProfileRequestDTO {
  user_id: string;
  name: string;
  email: string;
  cpf?: string;
  password?: string;
  old_password?: string;
}
