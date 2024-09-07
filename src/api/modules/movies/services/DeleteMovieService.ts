import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';

interface IRequest {
  id: string;
}

class DeleteMovieService {
  public async execute({ id }: IRequest): Promise<void> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movie = await moviesRepository.findById(id);

    if (!movie) {
      throw new AppError('Movie not found', 'Bad Request', 400);
    }

    await moviesRepository.remove(movie);
  }
}

export default DeleteMovieService;
