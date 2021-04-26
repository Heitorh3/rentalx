interface IToken {
  secret: string;
  expiresIn: string;
}
interface ITokenConfig {
  driver: 'jwt';

  access_token: IToken;

  refresh_token: IToken;
  // access_token: {
  //   secret_access_token: string;
  //   expiresIn_access_token: string;
  // };

  // refresh_token: {
  //   secret_refresh_token: string;
  //   expiresIn_refresh_token: string;
  // };

  config: {
    jwt: { k: string };
  };
}

export default {
  driver: process.env.TOKEN_DRIVER,

  // access_token: {
  //   secret_access_token: process.env.SECRET_TOKEN || 'secret',
  //   expiresIn_access_token: '15m',
  // },
  access_token: {
    secret: process.env.SECRET_TOKEN || 'secret',
    expiresIn: '15m',
  },

  // refresh_token: {
  //   secret_refresh_token: process.env.REFRESH_SECRET_TOKEN || 'secret_token',
  //   expiresIn_refresh_token: '30d',
  // },
  refresh_token: {
    secret: process.env.SECRET_TOKEN || 'secret',
    expiresIn: '15m',
  },

  config: {
    jwt: {},
  },
} as ITokenConfig;
