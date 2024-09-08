import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TicketsController from '../controller/TicketsController';

const ticketsRouter = Router();
const ticketsController = new TicketsController();

ticketsRouter.post(
  '/:movie_id/sessions/:session_id/tickets',
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().precision(2).required(),
    },
    [Segments.PARAMS]: {
      session_id: Joi.string().required(),
      movie_id: Joi.string().required(),
    },
  }),
  ticketsController.create,
);

ticketsRouter.put(
  '/:movie_id/sessions/:session_id/tickets/:id',
  celebrate({
    [Segments.BODY]: {
      chair: Joi.string().required(),
      value: Joi.number().precision(2).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
      session_id: Joi.string().required(),
      movie_id: Joi.string().required(),
    },
  }),
  ticketsController.update,
);

ticketsRouter.delete(
  '/:movie_id/sessions/:session_id/tickets/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
      session_id: Joi.string().required(),
      movie_id: Joi.string().required(),
    },
  }),
  ticketsController.delete,
);

export default ticketsRouter;
