import { EntityRepository, Repository } from 'typeorm';
import Session from '../entities/Session';

@EntityRepository(Session)
class SessionRepository extends Repository<Session> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async findByRoom(room: string) {
    const Session = await this.findOne({
      where: {
        room,
      },
    });
    return Session;
  }

  public async findById(id: number) {
    const session = await this.findOne({
      where: { id },
    });
    return session;
  }
}

export default SessionRepository;
