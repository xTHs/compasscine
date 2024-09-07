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

    return response.json(ticket);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const movie_id = parseInt(request.params.movie_id);
    const session_id = parseInt(request.params.session_id);

    const { chair, value } = request.body;

    const updateTicket = new UpdateTicketService();

    const ticket = await updateTicket.execute(
      {
        chair,
        value,
      },
      { id, session_id, movie_id },
    );

    return response.json(ticket);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const movie_id = request.params.movie_id;
    const session_id = request.params.session_id;
    const id = request.params.id;

    const deleteTicket = new DeleteTicketService();

    await deleteTicket.execute(
      { movie_id: Number(movie_id) },
      { session_id: Number(session_id) },
      { id: Number(id) },
    );
    return response.status(204).send('Ticket deleted');
  }
}
