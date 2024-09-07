import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ticket from '../typeorm/entities/Ticket';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';

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
interface idID {
  id: number;
}

class UpdateTicketService {
  public async execute(
    { chair, value }: IRequest,
    { movie_id }: moviedID,
    { session_id }: sessionID,
    { id }: idID,
  ): Promise<Ticket> {
    const ticketsRepository = getCustomRepository(TicketsRepository);

    const ticket = await ticketsRepository.findTicketforUpdate(
      id,
      movie_id,
      session_id,
      value,
      chair,
    );

    if (!ticket) {
      throw new AppError(`Ticket não encontrado`, 'Not Found', 404);
    }

    const chairSessionExists = await ticketsRepository.findByChairAndSession(
      session_id,
      chair,
    );

    if (chairSessionExists && chair !== ticket.chair) {
      throw new AppError(
        `O assento ${chair} já foi reservado para esta sessão.`,
        'Bad Request',
      );
    }

    ticket.chair = chair;
    ticket.value = value;

    await ticketsRepository.save(ticket);

    return ticket;
  }
}

export default UpdateTicketService;
