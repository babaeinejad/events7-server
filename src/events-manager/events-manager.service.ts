import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './types/create-event';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsManagerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEvents() {
    const events = await this.prismaService.events7.findMany();
    return events;
  }

  async getEvent(id: number) {
    const event = await this.prismaService.events7.findUnique({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async createEvent(event: Event) {
    const createdEvent = await this.prismaService.events7.create({
      data: event,
    });
    return createdEvent;
  }

  async updateEvent(id: number, event: Event) {
    await this.getEvent(id);
    const updatedEvent = await this.prismaService.events7.update({
      data: event,
      where: {
        id,
      },
    });
    return updatedEvent;
  }

  async deleteEvent(id: number) {
    await this.getEvent(id);
    const result = await this.prismaService.events7.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
