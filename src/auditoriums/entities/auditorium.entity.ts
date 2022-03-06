import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';

@Entity('auditoriums')
export class Auditorium {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Session, session => session.auditorium)
  sessions: Session[];
}
