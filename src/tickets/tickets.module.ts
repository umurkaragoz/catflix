import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SessionsModule,
    UsersModule,
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
