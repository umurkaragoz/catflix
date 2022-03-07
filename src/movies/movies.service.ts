import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ----------------------------------------------------------------------------------------------------------------------------- Movies Service -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class MoviesService {

  /* ------------------------------------------------------------------------------------------------------------------------------ constructor -+- */
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    private readonly sessionsService: SessionsService,
  ) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  async create(dto: CreateMovieDto) {
    const movie = await this.movieRepo.save(dto);


    if (movie) {
      const sessions = await dto.sessions;

      for (const session of sessions) {
        await this.sessionsService.create({
          ...session,
          movieId: movie.id,
        });
      }
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  async findAll() {
    return await this.movieRepo.find();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  async findOne(id: number) {
    const movie = await this.movieRepo.findOne(id);

    if (!movie) throw new NotFoundException(`Movie with ID '${id}' could not be found.`);

    return movie;
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return await this.movieRepo.update({ id }, updateMovieDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  async remove(id: number) {
    return await this.movieRepo.delete({ id });
  }
}
