import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';
import { UpdateAuditoriumDto } from './dto/update-auditorium.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorium } from './entities/auditorium.entity';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------ Auditoriums Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class AuditoriumsService {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepo: Repository<Auditorium>,
  ) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  async create(auditorium: CreateAuditoriumDto) {
    return await this.auditoriumRepo.save(auditorium);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  async findAll() {
    return await this.auditoriumRepo.find();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  async findOne(id: number) {
    const auditorium = await this.auditoriumRepo.findOne(id);

    if (!auditorium) throw new NotFoundException(`Auditorium with ID '${id}' could not be found.`);

    return auditorium;
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  async update(id: number, updateAuditoriumDto: UpdateAuditoriumDto) {
    return await this.auditoriumRepo.update({ id }, updateAuditoriumDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  async remove(id: number) {
    return await this.auditoriumRepo.delete({ id });
  }
}
