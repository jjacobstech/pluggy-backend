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
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let File = class File {
    id;
    file_name;
    file_path;
    file_format;
    file_type;
    file_size;
    user;
    created_at;
    updatedAt;
};
exports.File = File;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], File.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
    __metadata("design:type", String)
], File.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
    __metadata("design:type", String)
], File.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
    __metadata("design:type", String)
], File.prototype, "file_format", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 225 }),
    __metadata("design:type", String)
], File.prototype, "file_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], File.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.files, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], File.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], File.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)("files")
], File);
//# sourceMappingURL=files.entity.js.map