import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Ticket from '../typeorm/entities/Ticket';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';
import { instanceToInstance } from 'class-transformer';

interface IRequest {
  chair: string;
  value: number;
}
interface IReqParam {
  id: number;
  session_id: number;
  movie_id: number;
}

class UpdateTicketService {
  public async execute(
    { chair, value }: IRequest,
    { id, session_id, movie_id }: IReqParam,
  ): Promise<Ticket> {
    const ticketsRepository = getCustomRepository(TicketsRepository);

    const ticket = await ticketsRepository.findTicketforUpdateAndDelete(
      id,
      movie_id,
      session_id,
    );

    if (!ticket) {
      throw new AppError(`Ticket not found`, 'Not Found', 404);
    }

    const chairSessionExists = await ticketsRepository.findByChairAndSession(
      session_id,
      chair,
    );

    if (chairSessionExists && chair !== ticket.chair) {
      throw new AppError(
        `The chair ${chair} has already been reserved for this session.`,
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
