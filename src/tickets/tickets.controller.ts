import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TicketsService, WatchStatus } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ManagerGuard } from '../auth/guards/manager.guard';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
@UseGuards(BearerAuthGuard)
@ApiTags('Tickets')
@ApiBearerAuth()
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------- Tickets Controller -+- */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  /* ---------------------------------------------------------------------------------------------------------------------------------- history -+- */
  @Get('/history')
  @ApiOperation({
    summary: 'List current user\'s tickets, optionally with a watched status filter.',
  })
  @ApiTags('Customer Operations')
  @ApiQuery({
    name: 'watched',
    enum: WatchStatus,
  })
  async history(
    @Query('watched') watchStatus: WatchStatus = WatchStatus.All,
    @Req() req
  ) {
    const tickets = await this.ticketsService.findAll({
      watchStatus,
      userId: req.user.id
    });

    console.log(tickets);

    return tickets;
  }

  /* -------------------------------------------------------------------------------------------------------------------------------------- buy -+- */
  @Post('buy/:id')
  @ApiOperation({
    summary: 'Buy a ticket for authenticated user',
  })
  @ApiTags('Customer Operations')
  @ApiParam({
    type: 'number',
    name: 'id',
    description: 'ID of the movie session.',
  })
  async buy(@Param('id') id: string, @Req() req) {
    return this.ticketsService.create({
      sessionId: +id,
      userId: req.user.id,
      is_watched: false,
    });
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- create -+- */
  @Post()
  @UseGuards(ManagerGuard)
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
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'List all tickets.',
  })
  findAll() {
    return this.ticketsService.findAll();
  }

  /* --------------------------------------------------------------------------------------------------------------------------------- find One -+- */
  @Get(':id')
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Retrieve a single ticket using its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- update -+- */
  @Patch(':id')
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Update a ticket.',
  })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  /* ----------------------------------------------------------------------------------------------------------------------------------- remove -+- */
  @Delete(':id')
  @UseGuards(ManagerGuard)
  @ApiOperation({
    summary: 'Delete a ticket.',
  })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
