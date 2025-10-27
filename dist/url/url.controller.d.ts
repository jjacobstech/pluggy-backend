import { UrlService } from "./url.service";
import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    create(createUrlDto: CreateUrlDto): Promise<{
        shortUrl: string;
    }>;
    redirect(slug: string): Promise<{
        url: string;
        statusCode: number;
    }>;
    findAll(id: string): Promise<import("../database/entities/link.entity").Link[]>;
    update(id: string, updateUrlDto: UpdateUrlDto): Promise<{
        message: string;
        status: number;
    }>;
    remove(id: string): string;
}
