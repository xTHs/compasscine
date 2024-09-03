import AppError from "@shared/errors/AppError";
import { getMovieRepository } from "typeorm";
import MoviesRepository from "../typeorm/repositories/MoviesRepository";

interface IRequest {
  id: string;
}

class DeleteMovieService {
  public async execute({ id }: IRequest): Promise<void> {
    const moviesRepository = getMovieRepository(MoviesRepository);

    const movie = await moviesRepository.findById(id);

    if (!movie) {
      throw new AppError("Movie not found");
    }

    await moviesRepository.remove(movie);
  }
}

export default DeleteMovieService;
