import { EvnetType } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  Validate,
  IsString,
  IsEnum,
} from 'class-validator';
import { CustomRangeValidator } from '../validators/priority-validator';
import { EventTypeValidator } from '../validators/event-type-validator';

export class EventDto {
  @IsNotEmpty()
  @IsNumber()
  @Validate(CustomRangeValidator, [1, 10])
  priority: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(EvnetType)
  @Validate(EventTypeValidator)
  type: EvnetType;
}
