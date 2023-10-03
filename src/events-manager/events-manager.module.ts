import { Module } from '@nestjs/common';
import { EventsManagerController } from './events-manager.controller';
import { EventsManagerService } from './events-manager.service';

@Module({
  controllers: [EventsManagerController],
  providers: [EventsManagerService],
})
export class EventsManagerModule {}
