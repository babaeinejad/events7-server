// import { EvnetType } from '@prisma/client';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  //   ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'event-type-validator', async: false })
export class EventTypeValidator implements ValidatorConstraintInterface {
  //   validate(type: EvnetType, validationArguments: ValidationArguments) {
  validate() {
    return (
      //TODO check if the type is valid based on the location of the office
      true
    );
  }

  defaultMessage() {
    return 'Invalid event type. Please provide a valid event type';
  }
}
