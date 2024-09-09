import { getCustomRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';
import AppError from 'src/api/shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  actors: string[];
  genre: string;
  release_date: Date;
}

class CreateMovieService {
  public async execute({
    name,
    description,
    actors,
    genre,
    release_date,
  }: IRequest): Promise<Movie> {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const nameExists = await moviesRepository.findByName(name);
    if (nameExists) {
      throw new AppError(
        'The movie has already been registered.',
        'bad request',
        400,
      );
    }
    if (description.length > 100) {
      throw new AppError(
        'Description cannot exceed more than 100 characters',
        'Bad Request',
        400,
      );
    }

    const movie = moviesRepository.create({
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
