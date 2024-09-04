import {
  Column,
  CreateDateColumn,
  Entity,
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
