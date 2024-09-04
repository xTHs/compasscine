import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';
import { format } from 'date-fns';

class ListMoviesService {
  public async execute(): Promise<Movie[]> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.find({ relations: ['sessions'] });

    const formattedMovies = movies.map(movie => {
      if (movie.release_date) {
        movie.release_date = format(
          new Date(movie.release_date),
          'dd-MM-yyyy',
        ) as any;
      }
      return movie;
    });

    return formattedMovies;
  }
}

export default ListMoviesService;
