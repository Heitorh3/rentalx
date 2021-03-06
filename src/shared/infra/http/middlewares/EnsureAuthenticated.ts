import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import TokenExpiredError from '@shared/infra/errors/TokenExpiredError';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { id } = decoded as ITokenPayload;

    request.user = { id };

    return next();
  } catch {
    throw new TokenExpiredError('Invalid JWT token');
  }
}
