export default interface ITokenProvider {
  generateAccessToken(user_id: string): string;
  genereteRefreshToken(user_id: string): string;
}
