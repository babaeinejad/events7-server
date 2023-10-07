import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventsManagerModule } from 'src/events-manager/events-manager.module';
import { EventsManagerService } from 'src/events-manager/events-manager.service';

describe('EventsManagerController (e2e)', () => {
  let app: INestApplication;
  const eventsManagerService = {
    getEvents: () => ['event1'],
    deleteEvent: (id: number) => id + ' deleted',
    createEvent: () => 'event2',
    updateEvent: () => 'event2',
    getAvailableEventTypes: () => 'options',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventsManagerModule],
    })
      .overrideProvider(EventsManagerService)
      .useValue(eventsManagerService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET events', () => {
    return request(app.getHttpServer())
      .get('/events')
      .expect(200)
      .expect(['event1']);
  });

  it('/POST events', () => {
    return request(app.getHttpServer())
      .post('/events')
      .expect(201)
      .expect('event2');
  });

  it('/PUT events/:id', () => {
    return request(app.getHttpServer())
      .put('/events/2')
      .expect(200)
      .expect('event2');
  });

  it('/DELETE events/:id', () => {
    return request(app.getHttpServer())
      .delete('/events/1')
      .expect(200)
      .expect('1 deleted');
  });

  it('/GET events/available-event-types', () => {
    return request(app.getHttpServer())
      .get('/events/available-event-types')
      .expect(200)
      .expect('options');
  });
});
