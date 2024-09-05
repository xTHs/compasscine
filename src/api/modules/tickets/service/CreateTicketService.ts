import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ticket from '../typeorm/entities/Ticket';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';

interface IRequest {
  session_id: number;
  chair: string;
  value: number;
  movie_id: number;
}

class CreateTicketService {
  public async execute({
    session_id,
    chair,
    value,
    movie_id,
  }: IRequest): Promise<Ticket> {
    const ticketsRepository = getCustomRepository(TicketsRepository);

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
      session_id,
      movie_id,
    });

    await ticketsRepository.save(ticket);

    return ticket;
  }
}

export default CreateTicketService;
