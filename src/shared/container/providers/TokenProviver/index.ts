import { container } from 'tsyringe';

import authConfig from '@config/auth';

import JWTTokenProvider from './implementations/JWTTokenProvider';
import ITokenProvider from './models/ITokenProvider';

const providers = {
  jwt: JWTTokenProvider,
};

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  providers[authConfig.driver],
);
