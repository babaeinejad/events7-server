import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Delete,
  Get,
} from '@nestjs/common';
import { EventsManagerService } from './events-manager.service';
import { EventDto } from './dtos/events-manager.dto';

@Controller('events')
export class EventsManagerController {
  constructor(private readonly eventsManagerService: EventsManagerService) {}
  @Get('/:id')
  getEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsManagerService.getEvent(id);
  }

  @Get('/')
  getEvents() {
    return this.eventsManagerService.getEvents();
  }

  @Post()
  createEvent(@Body() body: EventDto) {
    return this.eventsManagerService.createEvent(body);
  }

  @Put('/:id')
  updateEvent(@Param('id', ParseIntPipe) id: number, @Body() body: EventDto) {
    return this.eventsManagerService.updateEvent(id, body);
  }

  @Delete('/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsManagerService.deleteEvent(id);
  }
}
