import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';
import SessionRepository from '../../sessions/typeorm/repositories/SessionRepository';
import Ticket from '../typeorm/entities/Ticket';

interface IRequest {
  chair: string;
  value: number;
}
interface sessionID {
  session_id: number;
}
interface moviedID {
  movie_id: number;
}

class CreateTicketService {
  public async execute(
    { chair, value }: IRequest,
    { movie_id }: moviedID,
    { session_id }: sessionID,
  ): Promise<Ticket> {
    const ticketsRepository = getCustomRepository(TicketsRepository);

    const moviesRepository = getCustomRepository(MoviesRepository);
    const movie = await moviesRepository.findById(movie_id);

    if (!movie) {
      throw new AppError('The movie is null', 'bad request', 400);
    }

    const sessionRepository = getCustomRepository(SessionRepository);
    const session = await sessionRepository.findById(session_id);

    const ticketExists = await ticketsRepository.findTicket(
      movie_id,
      session_id,
      value,
      chair,
    );

    if (ticketExists) {
      throw new AppError(`This ticket already exists`, 'Bad Request');
    }

    const chairExists = await ticketsRepository.findByChairAndSession(
      session_id,
      chair,
    );

    if (chairExists) {
      throw new AppError(
        `O assento ${chair} já foi reservado para esta sessão.`,
        'Bad Request',
      );
    }

    const ticket = ticketsRepository.create({
      chair,
      value,
    });
    ticket.movie_id = movie;
    ticket.session_id = session;
    await ticketsRepository.save(ticket);

    return ticket;
  }
}

export default CreateTicketService;
