import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';
import SessionRepository from '../../sessions/typeorm/repositories/SessionRepository';

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
  ) {
    const ticktRepository = getCustomRepository(TicketsRepository);
    const sessionID = session_id;
    const sessionRepository = getCustomRepository(SessionRepository);

    const sessionExist = await sessionRepository.findById(sessionID);

    if (sessionExist?.movie?.id !== movie_id) {
      console.log(sessionExist);
      throw new AppError('Movie is not session', 'Bad request', 400);
    }

    const ticket = ticktRepository.create({
      chair,
      value,
    });

    ticket.session = sessionExist;
    await ticktRepository.save(ticket);

    return ticket;
  }
}

export default CreateTicketService;
