import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './src/api/shared/http/routes';
import './src/api/shared/typeorm/connection';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import AppError from './src/api/shared/errors/AppError';

import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerDocument = YAML.load('./SWAGGER-COMPASSCINE.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/movies', routes);

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
