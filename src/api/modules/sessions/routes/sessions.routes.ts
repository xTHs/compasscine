import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/:movie_id', sessionController.create);
//sessionsRouter.put(...)

export default sessionsRouter;
