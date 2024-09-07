import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';
import { format } from 'date-fns';
import { instanceToInstance } from 'class-transformer';

interface IRequest {
  movie_id: number;
}

class ShowMovieService {
  public async execute({ movie_id }: IRequest): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movie = await moviesRepository.findOne(movie_id, {
      relations: ['sessions', 'sessions.tickets'],
    });

    if (!movie) {
      throw new AppError('Movie not found', 'Bad request', 404);
    }

    if (movie.release_date) {
      movie.release_date = format(
        new Date(movie.release_date),
        'dd-MM-yyyy',
      ) as any;
    }

    return instanceToInstance(movie);
  }
}

export default ShowMovieService;
