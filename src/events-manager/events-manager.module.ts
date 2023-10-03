import { Module } from '@nestjs/common';
import { EventsManagerController } from './events-manager.controller';
import { EventsManagerService } from './EventsManagerService';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [EventsManagerController],
  providers: [EventsManagerService],
})
export class EventsManagerModule {}
