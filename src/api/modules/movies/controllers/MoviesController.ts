import { Request, Response } from 'express';
import ListMoviesService from '../services/ListMoviesService';
import CreateMovieService from '../services/CreateMovieService';
import { instanceToInstance } from 'class-transformer';
import ShowMovieService from '../services/ShowMovieService';
import UpdateMovieService from '../services/UpdateMovieService';
import DeleteMovieService from '../services/DeleteMovieService';

export default class MoviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, actors, genre, release_date } = request.body;

    const createMovie = new CreateMovieService();

    const movie = await createMovie.execute({
      name,
      description,
      actors,
      genre,
      release_date,
    });

    return response.status(200).json(instanceToInstance(movie));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listMovies = new ListMoviesService();

    const movies = await listMovies.execute();

    return response.status(200).json(instanceToInstance(movies));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id: movie_id } = request.params;
    const showMovie = new ShowMovieService();
    const movie = await showMovie.execute({ movie_id: Number(movie_id) });

    return response.status(200).json(instanceToInstance(movie));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { name, description, actors, genre, release_date } = request.body;

    const updateMovie = new UpdateMovieService();

    const movie = await updateMovie.execute(
      {
        name,
        description,
        actors,
        genre,
        release_date,
      },
      { id },
    );

    return response.json(movie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteMovie = new DeleteMovieService();
    await deleteMovie.execute({ id });
    return response.status(204).send('Movie deleted');
  }
}
