import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import ITokenProvider from '../models/ITokenProvider';

class JWTTokenProvider implements ITokenProvider {
  generateAccessToken(user_id: string): string {
    const { secret, expiresIn } = authConfig.access_token;

    const token = sign({ id: user_id }, secret, {
      expiresIn,
    });

    return token;
  }

  genereteRefreshToken(user_id: string): string {
    const { secret, expiresIn } = authConfig.refresh_token;

    const token = sign({ id: user_id }, secret, {
      expiresIn,
    });

    return token;
  }
}
export default JWTTokenProvider;
