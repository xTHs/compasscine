import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Movie from 'src/api/modules/movies/typeorm/entities/Movie';
import Session from 'src/api/modules/sessions/typeorm/entities/Session';

@Entity('tickets')
class Ticket {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Session, session => session.tickets)
  session_id: Session | undefined;

  @ManyToOne(() => Movie, movie => movie.sessions)
  movie_id: Movie;

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
