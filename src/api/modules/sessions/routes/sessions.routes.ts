import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/:movie_id/sessions', sessionController.create);
sessionsRouter.delete('/:movie_id/sessions/:id', sessionController.delete);
sessionsRouter.put('/:movie_id/sessions/:id', sessionController.update);

export default sessionsRouter;
