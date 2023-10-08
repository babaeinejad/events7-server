import { Module } from '@nestjs/common';
import { EventsManagerController } from 'src/events-manager/events-manager.controller';
import { EventsManagerService } from 'src/events-manager/events-manager.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule, CacheModule.register()],
  controllers: [EventsManagerController],
  providers: [EventsManagerService],
})
export class EventsManagerModule {}
