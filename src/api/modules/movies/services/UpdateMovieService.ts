import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';
import { instanceToInstance } from 'class-transformer';

interface IRequest {
  name: string;
  description: string;
  actors: string[];
  genre: string;
  release_date: Date;
}
interface IReqParam {
  id: number;
}

class UpdateMovieService {
  public async execute(
    { name, description, actors, genre, release_date }: IRequest,
    { id }: IReqParam,
  ): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movie = await moviesRepository.findById(id);

    if (!movie) {
      throw new AppError('Movie not found', 'Bad Request', 400);
    }

    if (description.length > 100) {
      throw new AppError(
        'Description cannot exceed more than 100 characters',
        'Bad Request',
        400,
      );
    }
    movie.name = name;
    movie.description = description;
    movie.actors = actors;
    movie.genre = genre;
    movie.release_date = release_date;

    await moviesRepository.save(movie);

    return instanceToInstance(movie);
  }
}

export default UpdateMovieService;
