import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';

import cors from 'cors';
import { pagination } from 'typeorm-pagination';

import express, { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

import { logger } from '@shared/utils/logger';
import routes from './routes';

import pinoHttp from 'pino-http';

const app = express();

// - APP USES

app.use(cors());
app.use(express.json());
app.use(pagination);
app.use(pinoHttp({ logger }));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// start express server
app.listen(process.env.HTTP_PORT || 3333, () => {
  console.log(` 🚀  Server is Running in ${process.env.HTTP_PORT}`);
});
