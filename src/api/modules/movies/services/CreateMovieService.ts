import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';

interface IRequest {
  image: string;
  name: string;
  description: string;
  actors: string[];
  genre: string;
  release_date: Date;
}

class CreateMovieService {
  public async execute({
    image,
    name,
    description,
    actors,
    genre,
    release_date,
  }: IRequest): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const movie = moviesRepository.create({
      image,
      name,
      description,
      actors,
      genre,
      release_date,
    });

    await moviesRepository.save(movie);

    return movie;
  }
}

export default CreateMovieService;
