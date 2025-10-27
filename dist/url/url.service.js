"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const link_entity_1 = require("../database/entities/link.entity");
const config_1 = require("../config");
let UrlService = class UrlService {
    linkRepository;
    app_url;
    constructor(linkRepository) {
        this.linkRepository = linkRepository;
        this.app_url = `${config_1.env.APP_URL}`;
    }
    createRandomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    async create(createUrlDto) {
        const shortUrl = createUrlDto.short_url != null
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
            throw new common_1.HttpException("Link already exists", 400);
        }
        const link = this.linkRepository.create({
            url: url,
            shortUrl: shortUrl,
            ...(createUrlDto.user_id ? { user_id: createUrlDto.user_id } : {})
        });
        if (!link) {
            throw new common_1.HttpException("Link not created", 500);
        }
        return {
            shortUrl: `${this.app_url}/${link.shortUrl}`,
        };
    }
    findAll() {
        const links = this.linkRepository.find();
        return links;
    }
    async findOne(slug) {
        const link = await this.linkRepository.findOneBy({
            shortUrl: slug,
        });
        if (!link) {
            throw new common_1.HttpException("Page not found", 404);
        }
        console.log("====================================");
        console.log(link);
        console.log("====================================");
        return `${link.url}`;
    }
    async update(id, updateUrlDto) {
        const result = await this.linkRepository.update(id, {
            shortUrl: updateUrlDto.short_url,
            url: updateUrlDto.url,
            user_id: updateUrlDto.user_id,
        });
        if (!result) {
            throw new common_1.HttpException("Url not updated", 404);
        }
        return {
            message: "Url updated successfully",
            status: 200
        };
    }
    remove(id) {
        return `This action removes a #${id} url`;
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(link_entity_1.Link)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UrlService);
//# sourceMappingURL=url.service.js.map