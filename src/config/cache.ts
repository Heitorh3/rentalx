import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}
export default {
  driver: process.env.CACHE_DRIVER,

  config: {
    redis: {
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;
