import { Test, TestingModule } from '@nestjs/testing';
import { EventsManagerService } from 'src/events-manager/events-manager.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AdsPermission,
  AdsPermissionEnum,
  Events7,
  ExtendedEvnet7Types,
  IpAPI,
} from 'src/events-manager/types/events';
import { of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { generalError } from './const';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('EventsManagerService', () => {
  let service: EventsManagerService;
  let httpService: HttpService;
  let prismaService: PrismaService;

  const mockEvents7: Events7[] = [
    {
      id: 1,
      type: ExtendedEvnet7Types.CROSPROMO,
      description: 'description',
      name: 'click',
      priority: 3,
    },
  ];
  const withPermissionsParams = [1, mockEvents7[0], '5.254.80.194'];
  const adsPermission = {
    ads: AdsPermissionEnum['sure, why not!'],
  };
  const countryCodeResponse = { countryCode: 'SI' };

  let mockValidateEvent;
  let mockGetEvent;
  let mockUpdateEvent;
  let mockDeleteEvent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsManagerService,
        {
          provide: PrismaService,
          useValue: {
            events7: {
              findMany: jest.fn().mockReturnValue(mockEvents7),
              findUnique: jest.fn().mockReturnValue(mockEvents7[0]),
              update: jest.fn().mockReturnValue(mockEvents7[0]),
              delete: jest.fn().mockReturnValue(mockEvents7[0]),
            },
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of(adsPermission)),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => of('')),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(() => of('')),
            set: jest.fn(() => of('')),
          },
        },
      ],
    }).compile();

    service = module.get<EventsManagerService>(EventsManagerService);
    httpService = module.get<HttpService>(HttpService);
    prismaService = module.get<PrismaService>(PrismaService);

    mockValidateEvent = jest.fn().mockReturnValue('');
    mockGetEvent = jest.fn().mockReturnValue(mockEvents7[0]);
    mockUpdateEvent = jest.fn().mockReturnValue(mockEvents7[0]);
    mockDeleteEvent = jest.fn().mockReturnValue(mockEvents7[0]);
    jest.spyOn(service, 'validateEvent').mockImplementation(mockValidateEvent);
    jest.spyOn(service, 'getEvent').mockImplementation(mockGetEvent);
    jest
      .spyOn(prismaService.events7, 'update')
      .mockImplementation(mockUpdateEvent);
    jest
      .spyOn(prismaService.events7, 'delete')
      .mockImplementation(mockDeleteEvent);
  });

  describe('get events', () => {
    it('should call prisma.event7.findMany', async () => {
      const mockPrismaFindManyEvents = jest.fn().mockReturnValue(mockEvents7);
      jest
        .spyOn(prismaService.events7, 'findMany')
        .mockImplementation(mockPrismaFindManyEvents);

      await service.getEvents();
      expect(mockPrismaFindManyEvents).toBeCalled();
    });
  });

  describe('update event', () => {
    it('should call service.validateEvent, getEvent and update methods', async () => {
      const [id, event, ip] = withPermissionsParams;
      await service.updateEvent(+id, event as Events7, ip as string);
      expect(mockValidateEvent).toBeCalled();
      expect(mockGetEvent).toBeCalled();
      expect(mockUpdateEvent).toBeCalled();
    });
  });

  describe('create event', () => {
    it('should call service.validateEvent and create methods', async () => {
      const [id, event, ip] = withPermissionsParams;
      await service.updateEvent(+id, event as Events7, ip as string);
      expect(mockValidateEvent).toBeCalled();
      expect(mockUpdateEvent).toBeCalled();
    });
  });

  describe('delete event', () => {
    it('should call service.validateEvent and create methods', async () => {
      const [id] = withPermissionsParams;
      await service.deleteEvent(+id);
      expect(mockGetEvent).toBeCalled();
      expect(mockDeleteEvent).toBeCalled();
    });
  });

  describe('check Ads Permision', () => {
    it('should return AdsPermission when HTTP request is successful', async () => {
      const countryCode = 'SI';

      const response: AxiosResponse<AdsPermission> = {
        data: adsPermission,
        headers: {},
        config: { headers: {} as any },
        status: 200,
        statusText: 'OK',
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      const result = await service.checkAdsPermision(countryCode);

      expect(result).toEqual(adsPermission);
    });

    it('should throw an error when HTTP request fails', async () => {
      const countryCode = 'SI';
      const failsResponse: AxiosResponse<any> = {
        data: 'error',
        headers: {},
        config: { headers: {} as any },
        status: 500,
        statusText: 'Internal Server Error',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(failsResponse));

      try {
        await service.checkAdsPermision(countryCode);
      } catch (error) {
        expect(error).toBe(generalError);
      }
    });
  });

  describe('get country code', () => {
    const ip = '5.254.80.194';
    it('should return country code when HTTP request is successful', async () => {
      const response: AxiosResponse<IpAPI> = {
        data: countryCodeResponse,
        headers: {},
        config: { headers: {} as any },
        status: 200,
        statusText: 'OK',
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      const result = await service.getCountryCode(ip);

      expect(result).toEqual(countryCodeResponse);
    });

    it('should throw an error when HTTP request fails', async () => {
      const failsResponse: AxiosResponse<any> = {
        data: 'error',
        headers: {},
        config: { headers: {} as any },
        status: 500,
        statusText: 'Internal Server Error',
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(failsResponse));

      try {
        await service.getCountryCode(ip);
      } catch (error) {
        expect(error).toBe(generalError);
      }
    });
  });
});
