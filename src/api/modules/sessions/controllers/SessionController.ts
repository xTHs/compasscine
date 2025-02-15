import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';
import DeleteSessionService from '../services/DeleteSessionService';
import UpdateSessionService from '../services/UpdateSessionsService';

export default class SessionController {
  public async create(request: Request, response: Response) {
    const { room, capacity, day, time } = request.body;

    const movie_id = request.params.movie_id;
    const createSession = new CreateSessionService();

    const session = await createSession.execute(
      { room, capacity, day, time },
      { movie_id: Number(movie_id) },
    );

    return response.status(201).json(session);
  }

  public async delete(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const movie_id = parseInt(request.params.movie_id);

    const deleteSession = new DeleteSessionService();

    await deleteSession.execute({ id }, { movie_id });
    return response.status(204).json('Session deleted');
  }

  public async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const movie_id = parseInt(request.params.movie_id);

    const { room, capacity, day, time } = request.body;

    const updateSession = new UpdateSessionService();

    const session = await updateSession.execute(
      { room, capacity, day, time },
      { movie_id, id },
    );

    return response.json(session).status(204);
  }
}
