import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { PasswordMatch } from "src/validators/password-match.validator";

export function IsPasswordMatch(
  property: string,
  validationOptions?: ValidationOptions
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: PasswordMatch,
    });
  };
}
