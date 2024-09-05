import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Session from './Session';
import Movie from './Movie';

@Entity('tickets')
class Ticket {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Session, session => session.tickets, { nullable: false })
  session: Session;

  @ManyToOne(() => Movie, movie => movie.tickets, { nullable: false })
  movie: Movie;

  @Column()
  chair: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Ticket;
