import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('sessions')
@UseGuards(BearerAuthGuard)
@ApiTags('Sessions')
@ApiBearerAuth()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------ Sessions Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  @Post()
  @ApiOperation({
    summary: 'Create a new session.',
  })
  @ApiBody({
    type: CreateSessionDto,
  })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  @Get()
  @ApiOperation({
    summary: 'List all sessions.',
  })
  findAll() {
    return this.sessionsService.findAll();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single session using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a session.',
  })
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a session.',
  })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
