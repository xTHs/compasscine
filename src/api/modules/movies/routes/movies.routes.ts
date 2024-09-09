import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MoviesController from '../controllers/MoviesController';

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.get('/', moviesController.list);

moviesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  moviesController.show,
);

moviesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().items(Joi.string()).required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
  moviesController.create,
);

moviesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().items(Joi.string()).required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
  moviesController.update,
);

moviesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  moviesController.delete,
);

export default moviesRouter;
