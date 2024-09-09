import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';

interface sessionID {
  session_id: number;
}
interface moviedID {
  movie_id: number;
}
interface idID {
  id: number;
}

class DeleteTicketService {
  public async execute(
    { movie_id }: moviedID,
    { session_id }: sessionID,
    { id }: idID,
  ): Promise<void> {
    const ticketsRepository = getCustomRepository(TicketsRepository);

    const ticket = await ticketsRepository.findTicketforDelete(
      id,
      movie_id,
      session_id,
    );

    if (!ticket) {
      throw new AppError(`Ticket não encontrado`, 'Not Found', 404);
    }

    await ticketsRepository.remove(ticket);
  }
}

export default DeleteTicketService;
