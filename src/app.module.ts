import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { EventsManagerModule } from 'src/events-manager/events-manager.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [EventsManagerModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
