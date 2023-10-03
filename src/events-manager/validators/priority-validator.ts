import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'range-validator', async: false })
export class CustomRangeValidator implements ValidatorConstraintInterface {
  validate(priority: number, validationArguments: ValidationArguments) {
    const { constraints } = validationArguments;
    return (
      priority >= (constraints[0] ?? 1) && priority <= (constraints[1] ?? 10)
    );
  }

  defaultMessage(validationArguments: ValidationArguments) {
    const { property, constraints } = validationArguments;
    return `${property} value must be between ${constraints[0] ?? 1} and ${
      constraints[1] ?? 10
    }`;
  }
}
