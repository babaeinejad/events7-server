import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsManagerModule } from './events-manager/events-manager.module';

@Module({
  imports: [EventsManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
