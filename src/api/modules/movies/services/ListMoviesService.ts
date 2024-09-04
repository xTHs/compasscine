import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';

class ListMoviesService {
  public async execute(): Promise<Movie[]> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.find({ relations: ['sessions'] });

    return movies;
  }
}

export default ListMoviesService;
