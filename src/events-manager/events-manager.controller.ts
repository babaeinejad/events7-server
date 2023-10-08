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
import { EventsManagerService } from 'src/events-manager/events-manager.service';
import { EventDto } from 'src/events-manager/dtos/events-manager.dto';
import { RealIP } from 'nestjs-real-ip';

@Controller('events')
export class EventsManagerController {
  constructor(private readonly eventsManagerService: EventsManagerService) {}
  @Get('/cursored/:id')
  async getEvents(@Param('id', ParseIntPipe) id?: number) {
    return this.eventsManagerService.getEvents(id);
  }

  @Get('/available-event-types')
  getAvailableEventTypes(@RealIP() ip: string) {
    return this.eventsManagerService.getAvailableEventTypes(ip);
  }

  @Get('/:id')
  getEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsManagerService.getEvent(id);
  }

  @Post()
  createEvent(@Body() body: EventDto, @RealIP() ip: string) {
    return this.eventsManagerService.createEvent(body, ip);
  }

  @Put('/:id')
  updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EventDto,
    @RealIP() ip: string,
  ) {
    return this.eventsManagerService.updateEvent(id, body, ip);
  }

  @Delete('/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsManagerService.deleteEvent(id);
  }
}
