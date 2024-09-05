import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';

interface IRequest {
  id: number;
  chair: string;
  value: number;
  session_id: number;
  movie_id: number;
}

class DeleteTicketService {
  public async execute({
    id,
    movie_id,
    session_id,
    value,
    chair,
  }: IRequest): Promise<void> {
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

    await ticketsRepository.remove(ticket);
  }
}

export default DeleteTicketService;
