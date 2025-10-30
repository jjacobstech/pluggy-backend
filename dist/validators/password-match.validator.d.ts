import { ValidatorConstraintInterface, ValidationArguments } from "class-validator";
export declare class PasswordMatch implements ValidatorConstraintInterface {
    validate(passwordConfirmation: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
