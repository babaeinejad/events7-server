import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  ParseIntPipe,
  Delete,
  Get,
  Ip,
} from '@nestjs/common';
import { EventsManagerService } from './EventsManagerService';
import { EventDto } from './dtos/events-manager.dto';

@Controller('events')
export class EventsManagerController {
  constructor(private readonly eventsManagerService: EventsManagerService) {}
  @Get('/')
  async getEvents() {
    return this.eventsManagerService.getEvents();
  }

  @Get('/available-event-types')
  getAvailableEventTypes(@Ip() ip) {
    return this.eventsManagerService.getAvailableEventTypes(ip);
  }

  @Get('/:id')
  getEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsManagerService.getEvent(id);
  }

  @Post()
  createEvent(@Body() body: EventDto, @Ip() ip) {
    console.log('ip is: ', ip);
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
