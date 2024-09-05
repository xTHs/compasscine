import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response) {
    const { room, capacity, day, time } = request.body;

    const { id: movie_id } = request.params;
    const createSession = new CreateSessionService();

    const session = await createSession.execute(
      { room, capacity, day, time },
      { movie_id: Number(movie_id) },
    );

    return response.status(200).json(session);
  }
}
