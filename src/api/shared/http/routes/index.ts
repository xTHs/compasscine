import { Router } from 'express';
import moviesRouter from '../../../modules/movies/routes/movies.routes';
import sessionsRouter from '../../../modules/sessions/routes/sessions.routes';
import ticketsRouter from '../../../modules/tickets/routes/tickets.routes';

const routes = Router();

routes.use('/', moviesRouter);
routes.use('/', sessionsRouter);
routes.use('/', ticketsRouter);

export default routes;
