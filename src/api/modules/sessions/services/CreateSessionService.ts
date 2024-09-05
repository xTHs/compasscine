import { getCustomRepository } from 'typeorm';
import Session from '../typeorm/entities/Session';
import SessionRepository from '../typeorm/repositories/SessionRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';
import AppError from 'src/api/shared/errors/AppError';
import Movie from '../../movies/typeorm/entities/Movie';

interface IRequest {
  room: string;
  capacity: number;
  day: Date;
  time: Date;
}
interface moviedID {
  movie_id: number;
}

class CreateSessionService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute(
    { room, capacity, day, time }: IRequest,
    { movie_id }: moviedID,
  ) {
    const moveiId = movie_id;
    const sessionRepository = getCustomRepository(SessionRepository);

    // verifica se ja existe sala com esse nome
    const roomExisted = await sessionRepository.findByRoom(room);

    const moviesRepository = getCustomRepository(MoviesRepository);
    const movie = await moviesRepository.findById(moveiId);

    if (roomExisted) {
      throw new AppError('The room has already registered', 'bad request', 400);
    }

    const session = sessionRepository.create({
      room,
      capacity,
      day,
      time,
    });
    session.movie = movie;

    await sessionRepository.save(session);
    return session;
  }
}

export default CreateSessionService;
