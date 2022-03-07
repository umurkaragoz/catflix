import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from '../users/users.service';
import { Session } from '../sessions/entities/session.entity';

export enum WatchStatus {
  All        = 'All',
  Watched    = 'Watched',
  NotWatched = 'Not Watched',
}

export type QueryParams = {
  watchStatus?: WatchStatus,
  userId?: number
}

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* --------------------------------------------------------------------------------------------------------------------------- Tickets Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class TicketsService {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    private readonly sessionsService: SessionsService,
    private readonly usersService: UsersService,
  ) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  async create(ticket: CreateTicketDto) {
    const session = await this.sessionsService.findOne(ticket.sessionId);

    // Lazy load `session.movie`.
    const movie = await session.movie;
    const user = await this.usersService.findOne(ticket.userId);

    if (user.age < movie.minAge) throw new ConflictException(`User '${user.id}' does not fit the audience criteria for the movie '${movie.id}'.`);

    return await this.ticketRepo.save(ticket);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  async findAll(queryParams?: QueryParams) {
    let query = createQueryBuilder(Ticket, 'tickets');

    if (queryParams) {
      switch (queryParams.watchStatus) {
        case WatchStatus.NotWatched:
          query = query.where('tickets.is_watched = 0');
          break;
        case WatchStatus.Watched:
          query = query.where('tickets.is_watched = 1');
          break;
        case WatchStatus.All:
        default:
          // We are not filtering by `is_watched`.
          break;
      }

      if (queryParams.userId !== undefined) {
        query = query.andWhere('tickets.user_id = :userId', { userId: queryParams.userId });
      }
    }

    return await query
      .leftJoinAndSelect('tickets.session', 'sessions')
      .leftJoinAndSelect('sessions.movie', 'movies')
      .getMany();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  async findOne(id: number) {
    const ticket = await this.ticketRepo.findOne(id);

    if (!ticket) throw new NotFoundException(`Ticket with ID '${id}' could not be found.`);

    return ticket;
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return await this.ticketRepo.update({ id }, updateTicketDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  async remove(id: number) {
    return await this.ticketRepo.delete({ id });
  }
}
