import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';

import '@shared/typeorm';
import '@shared/container';
import '@shared/mongoose/connections';

import AppError from '@shared/errors/AppError';
import TokenExpiredError from '@shared/errors/TokenExpiredError';

import { router } from 'routes';

const app = express();

app.use(router);
app.use(express.json());

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
