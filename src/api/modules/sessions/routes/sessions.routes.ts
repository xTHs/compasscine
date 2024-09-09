import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/:movie_id/sessions',
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().required(),
      day: Joi.date().required(),
      time: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      movie_id: Joi.string().required(),
    },
  }),
  sessionController.create,
);
sessionsRouter.delete(
  '/:movie_id/sessions/:id',
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().required(),
      id: Joi.string().required(),
    },
  }),
  sessionController.delete,
);
sessionsRouter.put(
  '/:movie_id/sessions/:id',
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      capacity: Joi.number().required(),
      day: Joi.date().required(),
      time: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      movie_id: Joi.string().required(),
      id: Joi.string().required(),
    },
  }),
  sessionController.update,
);

export default sessionsRouter;
