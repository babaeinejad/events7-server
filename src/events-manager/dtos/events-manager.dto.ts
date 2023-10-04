import {
  IsNotEmpty,
  IsNumber,
  Validate,
  IsString,
  IsEnum,
} from 'class-validator';
import { CustomRangeValidator } from 'src/events-manager/validators/priority-validator';
import { EventTypeValidator } from 'src/events-manager/validators/event-type-validator';
import { ExtendedEvnet7Types } from 'src/events-manager/types/events';

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
  @IsEnum(ExtendedEvnet7Types)
  @Validate(EventTypeValidator)
  type: ExtendedEvnet7Types;
}
