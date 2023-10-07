export enum ExtendedEvnet7Types {
  CROSPROMO = 'CROSPROMO',
  LIVEOPS = 'LIVEOPS',
  APP = 'APP',
  ADS = 'ADS',
}

export enum Evnet7Types {
  CROSPROMO = 'CROSPROMO',
  LIVEOPS = 'LIVEOPS',
  APP = 'APP',
}

export interface Events7 {
  id?: number;
  priority: number;
  name: string;
  description: string;
  type: ExtendedEvnet7Types;
}

export interface IpAPI {
  countryCode: string;
}

export interface AdsPermission {
  ads: AdsPermissionEnum;
}

export enum AdsPermissionEnum {
  'you shall not pass!' = 'you shall not pass!',
  'sure, why not!' = 'sure, why not!',
}
