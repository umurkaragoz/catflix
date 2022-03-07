import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuditoriumsService } from './auditoriums.service';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';
import { UpdateAuditoriumDto } from './dto/update-auditorium.dto';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManagerGuard } from '../auth/guards/manager.guard';

@Controller('auditoriums')
@UseGuards(BearerAuthGuard, ManagerGuard)
@ApiTags('Auditoriums')
@ApiBearerAuth()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* --------------------------------------------------------------------------------------------------------------------- Auditoriums Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class AuditoriumsController {
  constructor(private readonly auditoriumsService: AuditoriumsService) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  @Post()
  @ApiOperation({
    summary: 'Create a new auditorium.',
  })
  @ApiBody({
    type: CreateAuditoriumDto,
  })
  create(@Body() createAuditoriumDto: CreateAuditoriumDto) {
    return this.auditoriumsService.create(createAuditoriumDto);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  @Get()
  @ApiOperation({
    summary: 'List all auditoriums.',
  })
  findAll() {
    return this.auditoriumsService.findAll();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single auditorium using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.auditoriumsService.findOne(+id);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a auditorium.',
  })
  update(@Param('id') id: string, @Body() updateAuditoriumDto: UpdateAuditoriumDto) {
    return this.auditoriumsService.update(+id, updateAuditoriumDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a auditorium.',
  })
  remove(@Param('id') id: string) {
    return this.auditoriumsService.remove(+id);
  }
}
