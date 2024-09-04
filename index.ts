import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import routes from './src/api/shared/http/routes';
import './src/database/connection';
import bodyParser from 'body-parser';
import 'express-async-errors';
import { errors } from 'celebrate';
import AppError from './src/api/shared/errors/AppError';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.code).json({
        code: error.code,
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
