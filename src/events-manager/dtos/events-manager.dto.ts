import {
  IsNotEmpty,
  IsNumber,
  Validate,
  IsString,
  IsEnum,
} from 'class-validator';
import { CustomRangeValidator } from '../validators/priority-validator';
import { EventTypeValidator } from '../validators/event-type-validator';
import { Evnet7Types } from '../types/events';

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
  @IsEnum(Evnet7Types)
  @Validate(EventTypeValidator)
  type: Evnet7Types;
}
