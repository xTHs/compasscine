import { getCustomRepository } from 'typeorm';
import AppError from 'src/api/shared/errors/AppError';
import MoviesRepository from '../typeorm/repositories/MoviesRepository';
import SessionRepository from '../../sessions/typeorm/repositories/SessionRepository';
import TicketsRepository from '../../tickets/typeorm/repositories/TicketsRepository';

interface IRequest {
  id: string;
}

class DeleteMovieService {
  public async execute({ id }: IRequest): Promise<void> {
    const moviesRepository = getCustomRepository(MoviesRepository);
    const sessionRepository = getCustomRepository(SessionRepository);
    const ticketRepository = getCustomRepository(TicketsRepository);

    const movie = await moviesRepository.findOne(id);

    if (!movie) {
      throw new AppError('Movie not found', 'Bad Request', 400);
    }

    const sessions = await sessionRepository.find({ where: { movie: { id } } });

    for (const session of sessions) {
      await ticketRepository.delete({ session: { id: session.id } });
    }

    await sessionRepository.delete({ movie: { id } });

    await moviesRepository.remove(movie);
  }
}

export default DeleteMovieService;
