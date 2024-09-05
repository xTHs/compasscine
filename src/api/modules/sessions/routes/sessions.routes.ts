import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/:movie_id/session', sessionController.create);
sessionsRouter.delete('/:movie_id/sessions/:id', sessionController.delete);
//sessionsRouter.put(...)

export default sessionsRouter;
