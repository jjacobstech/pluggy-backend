import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "IsPasswordMatch", async: false })
export class PasswordMatch implements ValidatorConstraintInterface {
  validate(passwordConfirmation: string, args: ValidationArguments) {
    const password = (args.object as any)[args.constraints[0]];
    return passwordConfirmation === password;
  }

  defaultMessage(args: ValidationArguments) {
    return "passwords do not match!";
  }
}
