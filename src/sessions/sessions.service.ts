import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* --------------------------------------------------------------------------------------------------------------------------- Sessions Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class SessionsService {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  async create(session: CreateSessionDto) {
    return await this.sessionRepo.save(session);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  async findAll() {
    return await this.sessionRepo.find({
      relations: ['movie', 'auditorium'],
    });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  async findOne(id: number) {
    const session = await this.sessionRepo.findOne(id);

    if (!session) throw new NotFoundException(`Session with ID '${id}' could not be found.`);

    return session;
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  async update(id: number, updateSessionDto: UpdateSessionDto) {
    return await this.sessionRepo.update({ id }, updateSessionDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  async remove(id: number) {
    return await this.sessionRepo.delete({ id });
  }
}
