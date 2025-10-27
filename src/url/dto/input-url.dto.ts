import { IsUrl, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
export class InputUrlDto {
  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @Transform(({ value }) => +value, { toClassOnly: true })
  @IsNumber()
  id: number;
}
