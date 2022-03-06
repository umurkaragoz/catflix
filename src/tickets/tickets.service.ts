import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* --------------------------------------------------------------------------------------------------------------------------- Tickets Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class TicketsService {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  async create(ticket: CreateTicketDto) {
    return await this.ticketRepo.save(ticket);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  async findAll() {
    return await this.ticketRepo.find();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  async findOne(id: number) {
    return await this.ticketRepo.findOne(id);
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
