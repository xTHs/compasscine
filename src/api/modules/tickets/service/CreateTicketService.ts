import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';
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
    const ticketRepository = getCustomRepository(TicketsRepository);

    const sessionID = session_id;
    const sessionRepository = getCustomRepository(SessionRepository);

    const sessionExist = await sessionRepository.findById(sessionID);

    if (sessionExist?.movie?.id !== movie_id) {
      throw new AppError('Movie is not session', 'Bad request', 400);
    }

    const chairr = await ticketRepository.findByChair(chair);
    if (chairr) {
      throw new AppError(
        `This chair is already occupied ${chairr}`,
        'Bad request',
        400,
      );
    }

    const ticket = ticketRepository.create({
      chair,
      value,
    });

    await this.toCheckCapacity({ session_id });

    ticket.session = sessionExist;
    await ticketRepository.save(ticket);

    return ticket;
  }

  public async toCheckCapacity({ session_id }: sessionID) {
    const sessionRepository = getCustomRepository(SessionRepository);

    const session = await sessionRepository.findById(session_id);

    if (session && Number(session.capacity) !== 0) {
      session.capacity = session.capacity - 1;
      sessionRepository.save(session);
    } else {
      throw new AppError('number of chairs unavailable', ' Bad request', 400);
    }
  }
}

export default CreateTicketService;
