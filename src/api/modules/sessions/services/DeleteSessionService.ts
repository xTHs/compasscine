import AppError from 'src/api/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import SessionRepository from '../typeorm/repositories/SessionRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';

interface IRequest {
  id: number;
}
interface IReqParam {
  movie_id: number;
}

class DeleteSessionService {
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ id }: IRequest, { movie_id }: IReqParam) {
    const sessionRepository = getCustomRepository(SessionRepository);
    const session = await sessionRepository.findById(id);

    const moviesRepository = getCustomRepository(MoviesRepository);
    const movie = await moviesRepository.findById(movie_id);

    if (!movie) {
      throw new AppError('The movie is not is session', 'bad request', 400);
    }
    if (!session) {
      throw new AppError('Session not found', 'Bad request', 400);
    }
    await sessionRepository.remove(session);
  }
}

export default DeleteSessionService;
