import { Router } from 'express';
import moviesRouter from '../../../modules/movies/routes/movies.routes';
import sessionsRouter from '../../../modules/sessions/routes/sessions.routes';
import ticketsRouter from '../../../modules/tickets/routes/tickets.routes';

const routes = Router();

routes.use('/movies', moviesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tickets', ticketsRouter);

export default routes;
