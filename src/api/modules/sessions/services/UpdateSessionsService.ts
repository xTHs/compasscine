import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import SessionRepository from '../typeorm/repositories/SessionRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';
import { instanceToInstance } from 'class-transformer';

interface IRequest {
  room: string;
  capacity: number;
  day: Date;
  time: Date;
}

interface IReqParam {
  movie_id: number;
  id: number;
}

class UpdateSessionService {
  public async execute(
    { room, capacity, day, time }: IRequest,
    { movie_id, id }: IReqParam,
  ) {
    const sessionRepository = getCustomRepository(SessionRepository);
    const session = await sessionRepository.findById(id);

    if (!session) {
      throw new AppError('Session not found', 'Bad request', 400);
    }

    if ((await this.checkMoviesAndSession({ movie_id, id })) === false) {
      throw new AppError(
        `This film is not from that session ${movie_id} : ${id}`,
        'bad Request',
        400,
      );
    }

    session.id = id;
    session.capacity = capacity;
    session.day = day;
    session.room = room;
    session.time = time;

    await sessionRepository.save(session);
    return instanceToInstance(session);
  }

  public async checkMoviesAndSession({ movie_id, id }: IReqParam) {
    const sessionRepository = getCustomRepository(SessionRepository);
    const session = await sessionRepository.findById(id);

    if (session?.movie?.id !== movie_id) {
      return false;
    }
    return true;
  }
}

export default UpdateSessionService;
