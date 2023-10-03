import { Injectable } from '@nestjs/common';
import { CreateEvent } from './types/create-event';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsManagerService {
  constructor(private readonly prismaService: PrismaService) {}
  async createEvent(event: CreateEvent) {
    const createdEvent = await this.prismaService.events7.create({
      data: event,
    });
    return createdEvent;
  }
}
