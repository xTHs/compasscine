import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';

interface IRequest {
  movie_id: string;
}

class ShowMovieService {
  public async execute({ movie_id }: IRequest): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movie = await moviesRepository.findOne(movie_id, {
      relations: ['sessions'],
    });

    if (!movie) {
      throw new AppError('Movie not found');
    }

    return movie;
  }
}

export default ShowMovieService;
