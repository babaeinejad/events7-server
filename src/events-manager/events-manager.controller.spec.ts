import { Test, TestingModule } from '@nestjs/testing';
import { EventsManagerController } from 'src/events-manager/events-manager.controller';

describe('EventsController', () => {
  let controller: EventsManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsManagerController],
    }).compile();

    controller = module.get<EventsManagerController>(EventsManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
