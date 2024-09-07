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
}

export default TicketDTO;
