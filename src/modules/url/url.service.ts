import { HttpException, Injectable } from "@nestjs/common";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
import { InputUrlDto } from "./dto/input-url.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Link } from "src/database/entities/link.entity";
import { env } from "src/config";

@Injectable()
export class UrlService {
  private readonly app_url: string | undefined;
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {
    this.app_url = `${env.APP_URL}`;
  }

  createRandomString(length: number) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async create(createUrlDto: CreateUrlDto) {
    const shortUrl =
      createUrlDto.short_url != null
        ? createUrlDto.short_url
        : this.createRandomString(10);
    let url = createUrlDto.url;
    if (!url.includes("https://")) {
      url = `https://${url}`;
    }

    const exists = await this.linkRepository.findOneBy({
        url: url,
    });

    if (exists) {
      throw new HttpException("Link already exists", 400);
    }

    const link = this.linkRepository.create({
        url: url,
        shortUrl: shortUrl,
        ...(createUrlDto.user_id ? {user_id: createUrlDto.user_id} : {})
    });

    if (!link) {
      throw new HttpException("Link not created", 500);
    }
    return {
      shortUrl: `${this.app_url}/${link.shortUrl}`,
    };
  }

  findAll() {
    const links = this.linkRepository.find()
    return links;
  }


  async findOne(slug: string) {
    const link = await this.linkRepository.findOneBy({
        shortUrl: slug,
    });

    if (!link) {
      throw new HttpException("Page not found", 404);
    }

    console.log("====================================");
    console.log(link);
    console.log("====================================");

    return `${link.url}`;
  }

 async  update(id: number, updateUrlDto: UpdateUrlDto) {
  const result = await this.linkRepository.update(id, {
    shortUrl: updateUrlDto.short_url,
    url: updateUrlDto.url,
    user_id: updateUrlDto.user_id,
  });

  if (!result) {
    throw new HttpException("Url not updated", 404);
  }

    return {
      message: "Url updated successfully",
      status: 200
    };
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
