import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';
import { format } from 'date-fns';
import { instanceToInstance } from 'class-transformer';

class ListMoviesService {
  public async execute(): Promise<Movie[]> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.find({
      relations: ['sessions', 'sessions.tickets'],
    });
    const formattedMovies = movies.map(movie => {
      if (movie.release_date) {
        movie.release_date = format(
          new Date(movie.release_date),
          'dd-MM-yyyy',
        ) as any;
      }
      return instanceToInstance(movie);
    });

    return formattedMovies;
  }
}

export default ListMoviesService;
