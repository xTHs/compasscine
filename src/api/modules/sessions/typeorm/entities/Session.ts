import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Movie from 'src/api/modules/movies/typeorm/entities/Movie';
import Ticket from 'src/api/modules/tickets/typeorm/entities/Ticket';
import { Exclude } from 'class-transformer';

@Entity('sessions')
class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: string;

  @Column('int')
  capacity: number;

  @ManyToOne(() => Movie, movie => movie.sessions, {
    eager: true,
  })
  movie: Movie | undefined;

  @OneToMany(() => Ticket, ticket => ticket.session)
  tickets: Ticket[];

  @Column()
  day: Date;

  @Column()
  time: Date;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Session;
