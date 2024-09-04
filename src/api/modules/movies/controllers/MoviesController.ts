import { Request, Response } from 'express';
import ListMoviesService from '../services/ListMoviesService';
import CreateMovieService from '../services/CreateMovieService';
import { instanceToInstance } from 'class-transformer';
import ShowMovieService from '../services/ShowMovieService';

export default class MoviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { image, name, description, actors, genre, release_date } =
      request.body;

    const createMovie = new CreateMovieService();

    const movie = await createMovie.execute({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
    });

    return response.json(instanceToInstance(movie));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listMovies = new ListMoviesService();

    const movies = await listMovies.execute();

    return response.json(instanceToInstance(movies));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showMovie = new ShowMovieService();
    const { movie_id } = request.params;

    const movie = await showMovie.execute({ movie_id });

    return response.json(instanceToInstance(movie));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { image, name, description, actors, genre, release_date, sessions } =
      request.body;
    const { id } = request.params;

    const updateMovie = new UpdateMovieService();

    const movie = await updateMovie.execute({
      id,
      image,
      name,
      description,
      actors,
      genre,
      release_date,
      sessions,
    });

    return response.json(movie);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMovie = new DeleteMovieService();
    await deleteMovie.execute({ id });

    //confirmar resposta com o time
    return response.status(204).send();
  }
}
