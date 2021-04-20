import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import sentryConfig from '@config/sentry';
import * as Sentry from '@sentry/node';

import '@shared/infra/typeorm';
import '@shared/container';
import '@shared/mongoose/connections';
import AppError from '@shared/infra/errors/AppError';
import TokenExpiredError from '@shared/infra/errors/TokenExpiredError';

import routes from './api/v1';

const app = express();

Sentry.init({ dsn: sentryConfig.dsn });

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    exposedHeaders: ['X-Total-Count', 'X-Total-Page'],
  }),
);

app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(errors);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(err.stack);
  }

  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  if (err instanceof TokenExpiredError) {
    return response.status(401).json({
      code: 'token.expired',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app }
