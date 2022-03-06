import { Module } from '@nestjs/common';
import { AuditoriumsService } from './auditoriums.service';
import { AuditoriumsController } from './auditoriums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorium } from './entities/auditorium.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auditorium]),
  ],
  controllers: [AuditoriumsController],
  providers: [AuditoriumsService],
})
export class AuditoriumsModule {}
