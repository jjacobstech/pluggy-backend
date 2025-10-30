import {
  IsNotEmpty,
  IsUrl,
  IsString,
  IsOptional,
} from "class-validator";
export class CreateUrlDto {
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;

  @IsUrl()
  @IsOptional()
  @IsString()
  short_url: string;

  @IsString()
  @IsOptional()
  user_id: string;
}
