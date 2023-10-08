import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  AdsPermission,
  AdsPermissionEnum,
  Events7,
  Evnet7Types,
  ExtendedEvnet7Types,
  IpAPI,
} from 'src/events-manager/types/events';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ONE_DAY, PAGE_SIZE, generalError } from 'src/events-manager/const';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class EventsManagerService {
  private readonly logger = new Logger(EventsManagerService.name);
  baseIpApiUrl = this.configService.get<string>('IP_API_BASE_URL');
  adPermissionUrl = this.configService.get<string>('AD_PERMISSION_URL');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getCountryCode(ip: string): Promise<IpAPI> {
    const cachedCountry = await this.cacheManager.get<IpAPI>(
      `getCountryCode-${ip}`,
    );
    if (cachedCountry?.countryCode) {
      return cachedCountry;
    }
    const { data } = await firstValueFrom(
      this.httpService.get<IpAPI>(this.baseIpApiUrl + ip).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw generalError;
        }),
      ),
    );
    if (data && data?.countryCode) {
      await this.cacheManager.set(`getCountryCode-${ip}`, data, 0);
      return data;
    } else {
      throw generalError;
    }
  }

  async checkAdsPermision(countryCode: string): Promise<AdsPermission> {
    const cachedData = await this.cacheManager.get<AdsPermission>(
      `checkAdsPermision-${countryCode}`,
    );
    if (cachedData?.ads) {
      return cachedData;
    }
    const params = { countryCode };
    const username = 'fun7user';
    const password = 'fun7pass';

    const { data } = await firstValueFrom(
      this.httpService
        .get<AdsPermission>(this.adPermissionUrl, {
          params,
          auth: {
            username,
            password,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw generalError;
          }),
        ),
    );

    if (data && data.ads) {
      await this.cacheManager.set(
        `checkAdsPermision-${countryCode}`,
        data,
        ONE_DAY,
      );
      return data;
    } else {
      throw generalError;
    }
  }

  async getAvailableEventTypes(ip: string) {
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

  async getEvents(id?: number) {
    const events = await this.prismaService.events7.findMany({
      take: PAGE_SIZE,
      skip: 1,
      ...(id && {
        cursor: {
          id,
        },
      }),
      orderBy: {
        id: 'asc',
      },
    });
    return events;
  }

  async getEvent(id: number) {
    const event = await this.prismaService.events7.findUnique({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException("The event doesn't exist");
    }
    return event;
  }

  async validateEvent(event: Events7, ip: string) {
    if (ExtendedEvnet7Types[event.type] === ExtendedEvnet7Types.ADS) {
      const adsPermission = await this.checkAdsPermision(ip);
      if (
        AdsPermissionEnum[adsPermission.ads] ===
        AdsPermissionEnum['you shall not pass!']
      ) {
        throw new HttpException(
          AdsPermissionEnum['you shall not pass!'],
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }

  async createEvent(event: Events7, ip: string) {
    await this.validateEvent(event, ip);
    const createdEvent = await this.prismaService.events7.create({
      data: event,
    });
    return createdEvent;
  }

  async updateEvent(id: number, event: Events7, ip: string) {
    await this.validateEvent(event, ip);
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
