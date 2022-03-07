import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { getRepository } from 'typeorm';
import { Ticket } from '../tickets/entities/ticket.entity';
import { ManagerGuard } from '../auth/guards/manager.guard';

@Controller('movies')
@UseGuards(BearerAuthGuard)
@ApiTags('Movies')
@ApiBearerAuth()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* -------------------------------------------------------------------------------------------------------------------------- Movies Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /* ------------------------------------------------------------------------------------------------------------------------------------ watch -+- */
  @Post('watch/:id')
  @ApiOperation({
    summary: 'Watch a movie you have the ticket for.',
  })
  @ApiTags('Customer Operations')
  @ApiParam({
    type: 'number',
    name: 'id',
    description: 'ID of the movie.',
  })
  async watch(@Param('id') id: string, @Req() req) {
    // Get the requested movie and its sessions.
    const movie = await this.moviesService.findOne(+id);
    const sessions = await movie.sessions;

    if (!sessions.length) throw new ConflictException(`The movie '${id}' has no sessions yet.`);

    // Pluck session IDs to an array.
    const sessionIds = sessions.map(session => session.id);

    // Get a repository instance to work on tickets.
    const ticketRepo = getRepository(Ticket);

    // Check if the currently logged-in user has a ticket for any of this movie's sessions.
    const ticket: Ticket = await ticketRepo.createQueryBuilder('tickets')
      // We are looking for a ticket that is not consumed yet.
      .where('tickets.is_watched = 0')
      // Limit the query to current user only.
      .andWhere('tickets.user_id = :userId', { userId: req.user.id })
      // We are looking for a ticket that is for this movie's sessions.
      .andWhere('tickets.session_id IN (:...sessionIds)', { sessionIds: sessionIds })
      .getOne();

    if (!ticket) throw new UnauthorizedException(`Sorry, you do not have a ticket for movie '${id}'.`);

    // Mark the ticket as consumed, so user won't be able to consume it again.
    await ticketRepo.update(ticket, { is_watched: true });

    return `Congratulations! You've consumed your ticket '${ticket.id}' for movie '${movie.id}'`;
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  @Post()
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Create a new movie.',
  })
  @ApiBody({
    type: CreateMovieDto,
  })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  @Get()
  @ApiTags('Customer Operations')
  @ApiOperation({
    summary: 'List all movies.',
  })
  findAll() {
    return this.moviesService.findAll();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  @Get(':id')
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Retrieve a single movie using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  @Patch(':id')
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Update a movie.',
  })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  @Delete(':id')
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Delete a movie.',
  })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
