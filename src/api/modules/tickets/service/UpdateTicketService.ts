import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ticket from '../typeorm/entities/Ticket';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';

interface IRequest {
  id: number;
  chair: string;
  value: number;
  session_id: number;
  movie_id: number;
}

class UpdateTicketService {
  public async execute({
    id,
    movie_id,
    session_id,
    value,
    chair,
  }: IRequest): Promise<Ticket> {
    const ticketsRepository = getCustomRepository(TicketsRepository);

    const ticket = await ticketsRepository.findTicketforUpdateAndDelete(
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
