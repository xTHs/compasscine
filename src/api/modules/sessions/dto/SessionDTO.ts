import TicketDTO from '../../tickets/dto/TickectDTO';
import Session from '../typeorm/entities/Session';

export default class SessionDTO {
  id: number;
  movie_id?: number;
  room: string;
  capacity: number;
  day: Date;
  time: Date;
  tickets: TicketDTO[];

  constructor(session: Session) {
    this.id = session.id;
    this.movie_id = session.movie?.id;
    this.room = session.room;
    this.capacity = session.capacity;
    this.day = session.day;
    this.time = session.time;
    this.tickets = TicketDTO.convertTickInTicktDTO(session.tickets);
  }

  static convertSessionInSessionDTO(session: Session[]) {
    if (!session) {
      return [];
    } else {
      const sessionDTO: SessionDTO[] = [];
      for (let i = 0; i < session.length; i++) {
        sessionDTO.push(new SessionDTO(session[i]));
      }
      return sessionDTO;
    }
  }
}
