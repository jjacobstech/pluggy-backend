import { PartialType } from "@nestjs/mapped-types";
import { CreateUrlDto } from "./create-url.dto";

export class ShortenUrlDto extends PartialType(CreateUrlDto) {}
