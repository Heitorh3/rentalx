export default {
  access_token: {
    secret_access_token: process.env.SECRET_TOKEN || 'secret',
    expiresIn_access_token: '15m',
  },
  refresh_token: {
    secret_refresh_token: process.env.REFRESH_SECRET_TOKEN || 'secret_token',
    expiresIn_refresh_token: '30d',
  },
};
