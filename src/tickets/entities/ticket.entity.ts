import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';
import { User } from '../../users/entities/user.entity';

@Entity('tickets')
export class Ticket {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_id', nullable: true })
  sessionId: number;

  @ManyToOne(() => Session, session => session.tickets)
  // TypeORM by default uses camelCase column names. Override column name in relation options to use snake_case.
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, user => user.tickets)
  // TypeORM by default uses camelCase column names. Override column name in relation options to use snake_case.
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bool', name: 'is_watched' })
  is_watched: boolean;

}
