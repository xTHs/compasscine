import { Request, Response } from 'express';
import CreateTicketService from '../service/CreateTicketService';
import UpdateTicketService from '../service/UpdateTicketService';
import DeleteTicketService from '../service/DeleteTicketService';
import TicketsRepository from '../typeorm/repositories/TicketsRepository';
import TicketDTO from '../dto/TickectDTO';

export default class TicketsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const movie_id = request.params.movie_id;
    const session_id = request.params.session_id;

    const { chair, value } = request.body;

    const createTicket = new CreateTicketService();

    const ticket = await createTicket.execute(
      {
        value,
        chair,
      },
      { movie_id: Number(movie_id) },
      { session_id: Number(session_id) },
    );

    const ticketDTO = new TicketDTO(ticket);
    return response.json(ticketDTO);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { chair, value } = request.body;
    const { session_id, movie_id, id } = request.params;

    const ticketId = Number(id);
    const sessionId = Number(session_id);
    const movieId = Number(movie_id);

    const updateTicket = new UpdateTicketService();

    const ticket = await updateTicket.execute({
      id: ticketId,
      chair,
      value,
      session_id: sessionId,
      movie_id: movieId,
    });

    const ticketReturn = {
      id: ticket.id,
      session_id: ticket.session,
      chair: ticket.chair,
      value: ticket.value,
    };

    return response.json(ticketReturn);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { chair, value } = request.body;
    const { session_id, movie_id, id } = request.params;

    const ticketId = Number(id);
    const sessionId = Number(session_id);
    const movieId = Number(movie_id);

    const deleteTicket = new DeleteTicketService();

    await deleteTicket.execute({
      id: ticketId,
      chair,
      value,
      session_id: sessionId,
      movie_id: movieId,
    });
    return response.status(204).send('Ticket deleted')
  }
}
