import { EntityRepository, Repository } from 'typeorm';
import Ticket from '../entities/Ticket';

@EntityRepository(Ticket)
class TicketsRepository extends Repository<Ticket> {
  public async findById(id: number): Promise<Ticket | undefined> {
    const ticket = await this.findOne({
      where: {
        id,
      },
    });

    return ticket;
  }

  public async findByChair(chair: string): Promise<Ticket | undefined> {
    const ticket = await this.findOne({
      where: {
        chair,
      },
    });

    return ticket;
  }

  public async findByChairAndSession(
    session_id: number,
    chair: string,
  ): Promise<Ticket | undefined> {
    const ticket = await this.findOne({
      where: {
        session: { id: session_id },
        chair,
      },
    });

    return ticket;
  }

  public async findTicket(
    session_id: number,
    value: number,
    chair: string,
  ): Promise<Ticket | undefined> {
    const ticket = await this.findOne({
      where: {
        session_id,
        value,
        chair,
      },
    });

    return ticket;
  }

  public async findTicketforUpdateAndDelete(
    id: number,
    movie_id: number,
    session_id: number,
  ): Promise<Ticket | undefined> {
    const ticket = await this.findOne({
      where: {
        id,
        session: {
          id: session_id,
          movie: { id: movie_id },
        },
      },
      relations: ['session', 'session.movie'],
    });

    return ticket;
  }

  public async findTicketforDelete(
    id: number,
    movie_id: number,
    session_id: number,
  ): Promise<Ticket | undefined> {
    const ticket = await this.findOne({
      where: {
        id,
        session: {
          id: session_id,
          movie: { id: movie_id },
        },
      },
      relations: ['session', 'session.movie'],
    });

    return ticket;
  }
}

export default TicketsRepository;
