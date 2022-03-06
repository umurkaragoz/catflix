import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tickets')
@UseGuards(BearerAuthGuard)
@ApiTags('Tickets')
@ApiBearerAuth()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------- Tickets Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  @Post()
  @ApiOperation({
    summary: 'Create a new ticket.',
  })
  @ApiBody({
    type: CreateTicketDto,
  })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find All -+- */
  @Get()
  @ApiOperation({
    summary: 'List all tickets.',
  })
  findAll() {
    return this.ticketsService.findAll();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a single ticket using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a ticket.',
  })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a ticket.',
  })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
