import AppError from '@shared/errors/AppError';
import { getMovieRepository } from 'typeorm';
import Movie from '../typeorm/entities/Movie';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';


interface IRequest {
  id: string;
  image: string;
  name: string;
  description: string;
  actors: string;
  genre: string;
  release_date: string;
  sessions: string;
}

class UpdateMovieService {
  public async execute({
    id,
    image,
    name,
    description,
    actors,
    genre,
    release_date,
    sessions,
  }: IRequest): Promise<Movie> {
    const moviesRepository = getMovieRepository(MoviesRepository);

    const movie = await moviesRepository.findById(id);

    if (!movie) {
      throw new AppError("Movie not found");
    }

    movie.image = image;
    movie.name = name;
    movie.description = description;
    movie.actors = actors;
    movie.genre = genre;
    movie.release_date = release_date;
    movie.sessions = sessions;


    await moviesRepository.save(movie);

    return movie;
  }
}


export default UpdateMovieService;