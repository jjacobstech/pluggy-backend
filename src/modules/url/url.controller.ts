import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Redirect,
} from "@nestjs/common";
import { UrlService } from "./url.service";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
@Controller("url")
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post("shorten")
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get(":slug")
  @Redirect()
  async redirect(@Param("slug") slug: string) {
    const url = await this.urlService.findOne(slug);

    console.log("URL from database:", url);

    return {
      url: url,
      statusCode: 301,
    };
  }

  @Get(":id")
  findAll(@Param("id") id: string) {
    return this.urlService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.urlService.remove(+id);
  }
}
