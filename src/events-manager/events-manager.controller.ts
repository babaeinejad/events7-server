import { Controller, Post } from '@nestjs/common';
import { EventsManagerService } from './events-manager.service';

@Controller('events-manager')
export class EventsManagerController {
  constructor(private readonly eventsManagerService: EventsManagerService) {}
  @Post('/create')
  createEvent() {
    return this.eventsManagerService.createEvent();
  }
}
