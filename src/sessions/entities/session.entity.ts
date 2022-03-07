import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auditorium } from '../../auditoriums/entities/auditorium.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

export enum TimeSlot {
  TS10 = '10:00 - 12:00',
  TS12 = '12:00 - 14:00',
  TS14 = '14:00 - 16:00',
  TS16 = '16:00 - 18:00',
  TS18 = '18:00 - 20:00',
  TS20 = '20:00 - 22:00',
  TS22 = '22:00 - 00:00',
}

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'movie_id', nullable: true })
  movieId: number;

  @ManyToOne(() => Movie, movie => movie.sessions)
  // TypeORM by default uses camelCase column names. Override column name in relation options to use snake_case.
  @JoinColumn({ name: 'movie_id' })
  movie: Promise<Movie>;

  @Column({ name: 'auditorium_id', nullable: true })
  auditoriumId: number;

  @ManyToOne(() => Auditorium, auditorium => auditorium.sessions)
  // TypeORM by default uses camelCase column names. Override column name in relation options to use snake_case.
  @JoinColumn({ name: 'auditorium_id' })
  auditorium: Auditorium;

  @Column({
    type: 'enum',
    name: 'time_slot',
    enum: TimeSlot,
    default: TimeSlot.TS12,
  })
  timeSlot: TimeSlot;

  @Column({ type: 'date' })
  date: string;

  @OneToMany(() => Ticket, ticket => ticket.session)
  tickets: Ticket[];
}
