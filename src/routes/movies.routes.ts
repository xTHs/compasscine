import { Router } from 'express';

const moviesRouter = Router();











moviesRouter.put('/movies/:id',
    celebrate({
        [Segments.PARAMS]:{
            id:Joi.string().required(), //verificar com o time se o parâmetro vai ser UUID
        },
        [Segments.BODY]:{
            name: Joi.string().required(),
            description: Joi.string().required(),
            actors: Joi.array().items(Joi.string()).required(),
            gender:Joi.string().required(),
        }
    }),
    moviesController.update,
);

moviesRouter.delete('/movies/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    })
    moviesController.delete,
)

export default moviesRouter;
