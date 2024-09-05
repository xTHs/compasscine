import Movie from 'src/api/modules/movies/typeorm/entities/Movie';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sessao')
class Sessao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room: string;

  @Column('int')
  capacity: number;

  @ManyToOne(() => Movie, movie => movie.sessions)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column()
  day: Date;

  @Column()
  time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sessao;
