import { container } from 'tsyringe';

import loggerConfig from '@config/logger';

import WinstonProvider from './implementation/WinstonProvider';
import ILoggerProvider from './models/LoggerProvider';

container.registerInstance<ILoggerProvider>(
  'LoggerProvider',
  new WinstonProvider(loggerConfig.config[loggerConfig.driver]),
);
