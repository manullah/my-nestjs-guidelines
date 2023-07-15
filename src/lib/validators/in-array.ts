import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class InArrayConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const arrayParams = args.constraints;

    const exists = arrayParams.find((v) => v == value);
    if (!exists) return false;
    return exists;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `$property must be one of the following values: ${args.constraints}`;
  }
}

export function InArray(
  araryVal: any[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: araryVal,
      validator: InArrayConstraint,
    });
  };
}
