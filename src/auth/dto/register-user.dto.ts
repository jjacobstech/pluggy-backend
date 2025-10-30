import {
  IsEmail,
  IsString,
  MinLength,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';
import { IsPasswordMatch } from 'src/decorator/password-match.decorator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsPasswordMatch('password', { message: 'Passwords do not match' })
  confirm_password: string;
}
