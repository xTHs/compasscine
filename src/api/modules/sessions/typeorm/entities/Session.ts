import Movie from 'src/api/modules/movies/typeorm/entities/Movie';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { format } from 'date-fns';

@Entity('session')
class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: string;

  @Column('int')
  capacity: number;

  @ManyToOne(() => Movie, movie => movie.sessions)
  movie: Movie;

  @Column()
  day: Date;

  @Column()
  time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'formatted_release_date' })
  getFormattedReleaseDate(): string {
    return format(this.day, 'dd-MM-yyyy');
  }
}

export default Session;
