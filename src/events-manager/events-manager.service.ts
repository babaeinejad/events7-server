import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  AdsPermission,
  AdsPermissionEnum,
  Event,
  Evnet7Types,
  ExtendedEvnet7Types,
  IpAPI,
} from './types/events';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class EventsManagerService {
  private readonly logger = new Logger(EventsManagerService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getCountryCode(ip: string): Promise<IpAPI> {
    //TODO remove logger
    this.logger.log('ip is: ', ip);
    const { data } = await firstValueFrom(
      this.httpService.get<IpAPI>(`http://ip-api.com/json/${ip}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async checkAdsPermision(countryCode: string): Promise<AdsPermission> {
    const url =
      'https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner';
    const params = { countryCode };
    const username = 'fun7user';
    const password = 'fun7pass';

    const { data } = await firstValueFrom(
      this.httpService
        .get<AdsPermission>(url, {
          params,
          auth: {
            username,
            password,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async getAvailableEventTypes(ip: string) {
    //TODO remove logger
    this.logger.log('ip is: ', ip);
    const isLocalhost = ip === '127.0.0.1' || ip === '::1';
    if (isLocalhost) {
      return ExtendedEvnet7Types;
    }

    const { countryCode } = await this.getCountryCode(ip);
    const { ads } = await this.checkAdsPermision(countryCode);

    return ads === AdsPermissionEnum['you shall not pass!']
      ? Evnet7Types
      : ExtendedEvnet7Types;
  }

  async getEvents() {
    const events = await this.prismaService.events7.findMany();
    return events;
  }

  async getEvent(id: number) {
    const event = await this.prismaService.events7.findUnique({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async createEvent(event: Event) {
    const createdEvent = await this.prismaService.events7.create({
      data: event,
    });
    return createdEvent;
  }

  async updateEvent(id: number, event: Event) {
    await this.getEvent(id);
    const updatedEvent = await this.prismaService.events7.update({
      data: event,
      where: {
        id,
      },
    });
    return updatedEvent;
  }

  async deleteEvent(id: number) {
    await this.getEvent(id);
    const result = await this.prismaService.events7.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
