import { Router } from 'express';
import moviesRouter from './movies.routes';
import sessionsRouter from './sessions.routes';
import ticketsRouter from './tickets.routes';

const routes = Router();

routes.use('/movies', moviesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tickets', ticketsRouter);

export default routes;
