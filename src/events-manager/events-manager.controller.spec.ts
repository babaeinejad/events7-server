import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EventsManagerController } from 'src/events-manager/events-manager.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsManagerService } from './events-manager.service';

describe('EventsController', () => {
  let controller: EventsManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, HttpModule],
      controllers: [EventsManagerController],
      providers: [EventsManagerService],
    }).compile();

    controller = module.get<EventsManagerController>(EventsManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
