import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'min_age' })
  minAge: number;

  @OneToMany(() => Session, session => session.movie)
  @JoinColumn({ name: 'id', referencedColumnName: 'movie_id' })
  sessions: Promise<Session[]>;
}
