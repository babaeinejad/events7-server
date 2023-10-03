import { Body, Controller, Post } from '@nestjs/common';
import { EventsManagerService } from './events-manager.service';
import { CreateEventDto } from './dtos/events-manager.dto';

@Controller('events-manager')
export class EventsManagerController {
  constructor(private readonly eventsManagerService: EventsManagerService) {}
  @Post('/create')
  createEvent(@Body() body: CreateEventDto) {
    return this.eventsManagerService.createEvent(body);
  }
}
