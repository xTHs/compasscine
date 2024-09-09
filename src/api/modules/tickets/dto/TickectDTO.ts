import { Any } from 'typeorm';
import Ticket from '../typeorm/entities/Ticket';

class TicketDTO {
  id: number;
  session_id?: number;
  chair: string;
  value: number;
  constructor(ticket: Ticket) {
    this.id = ticket.id;
    this.session_id = ticket.session?.id;
    this.chair = ticket.chair;
    this.value = ticket.value;
  }

  static convertTickInTicktDTO(tickets: Ticket[]) {
    if (!tickets) {
      return [];
    } else {
      const ticktesDTO: TicketDTO[] = [];
      for (let i = 0; i < tickets.length; i++) {
        ticktesDTO.push(new TicketDTO(tickets[i]));
      }
      return ticktesDTO;
    }
  }
}

export default TicketDTO;
