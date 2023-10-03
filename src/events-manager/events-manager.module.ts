import { Module } from '@nestjs/common';
import { EventsManagerController } from './events-manager.controller';
import { EventsManagerService } from './events-manager.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventsManagerController],
  providers: [EventsManagerService],
})
export class EventsManagerModule {}
