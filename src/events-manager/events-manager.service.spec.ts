import { Test, TestingModule } from '@nestjs/testing';
import { EventsManagerService } from './events-manager.service';

describe('EventsManagerService', () => {
  let service: EventsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsManagerService],
    }).compile();

    service = module.get<EventsManagerService>(EventsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
