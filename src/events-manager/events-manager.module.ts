import { Module } from '@nestjs/common';
import { EventsManagerController } from 'src/events-manager/events-manager.controller';
import { EventsManagerService } from 'src/events-manager/events-manager.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  controllers: [EventsManagerController],
  providers: [EventsManagerService],
})
export class EventsManagerModule {}
