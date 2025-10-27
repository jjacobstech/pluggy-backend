"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenUrlDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_url_dto_1 = require("./create-url.dto");
class ShortenUrlDto extends (0, mapped_types_1.PartialType)(create_url_dto_1.CreateUrlDto) {
}
exports.ShortenUrlDto = ShortenUrlDto;
//# sourceMappingURL=shorten-url.dto.js.map