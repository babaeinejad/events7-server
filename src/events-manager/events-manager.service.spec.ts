import { Test, TestingModule } from '@nestjs/testing';
import { EventsManagerService } from 'src/events-manager/events-manager.service';
import { EventsManagerController } from './events-manager.controller';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('EventsManagerService', () => {
  //Austria: 5.254.80.194
  //Switzerland: 37.120.213.51
  let service: EventsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, HttpModule],
      controllers: [EventsManagerController],
      providers: [EventsManagerService],
    }).compile();

    service = module.get<EventsManagerService>(EventsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
