import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import routes from './src/routes';
import './src/database/connection';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
