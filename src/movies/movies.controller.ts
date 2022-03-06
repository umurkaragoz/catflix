import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@UseGuards(BearerAuthGuard)
@ApiTags('Movies')
@ApiBearerAuth()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* -------------------------------------------------------------------------------------------------------------------------- Movies Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  @Post()
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
  @ApiOperation({
    summary: 'List all movies.',
  })
  findAll() {
    return this.moviesService.findAll();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single movie using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a movie.',
  })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a movie.',
  })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
