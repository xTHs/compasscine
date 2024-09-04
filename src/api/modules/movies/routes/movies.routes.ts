import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MoviesController from '../controllers/MoviesController';

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.get('/movies', moviesController.list);

moviesRouter.get(
  '/movies/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.show,
);

moviesRouter.post(
  '/movies',
  celebrate({
    [Segments.BODY]: {
      movie_id: Joi.string().uuid().required(),
      image: Joi.required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.string().required(),
      genre: Joi.string().required(),
      release_date: Joi.date().required(),
    },
  }),
  moviesController.create,
);

moviesRouter.put(
  '/movies/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      actors: Joi.array().items(Joi.string()).required(),
      gender: Joi.string().required(),
    },
  }),
  moviesController.update,
);

moviesRouter.delete(
  '/movies/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.delete,
);

export default moviesRouter;
