import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Session from 'src/api/modules/sessions/typeorm/entities/Session';
import { Exclude } from 'class-transformer';

@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  actors: string[];

  @Column()
  genre: string;

  @Column()
  release_date: Date;

  @OneToMany(() => Session, (sessions: Session) => sessions.movie,{cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  sessions: Session[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Movie;
