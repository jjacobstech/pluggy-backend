import { CreateUrlDto } from "./dto/create-url.dto";
import { UpdateUrlDto } from "./dto/update-url.dto";
import { Repository } from "typeorm";
import { Link } from "src/database/entities/link.entity";
export declare class UrlService {
    private readonly linkRepository;
    private readonly app_url;
    constructor(linkRepository: Repository<Link>);
    createRandomString(length: number): string;
    create(createUrlDto: CreateUrlDto): Promise<{
        shortUrl: string;
    }>;
    findAll(): Promise<Link[]>;
    findOne(slug: string): Promise<string>;
    update(id: number, updateUrlDto: UpdateUrlDto): Promise<{
        message: string;
        status: number;
    }>;
    remove(id: number): string;
}
