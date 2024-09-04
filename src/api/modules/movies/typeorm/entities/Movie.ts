import {
  Column,
  CreateDateColumn,
  Entity,
  //OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//import Session from 'src/api/modules/sessions/typeorm/Session';
import { Expose } from 'class-transformer';
import { format } from 'date-fns';

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

  // @OneToMany(() => Session, session => session.movie)
  // sessions: Session[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'formatted_release_date' })
  getFormattedReleaseDate(): string {
    return format(this.release_date, 'dd-MM-yyyy');
  }
}

export default Movie;
