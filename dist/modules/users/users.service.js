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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findAll() {
        return `This action returns all users`;
    }
    async create(user) {
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        const newUser = this.userRepository.create({
            name: user.name,
            email: user.email,
            phone_no: user.phone_no,
            password: hashedPassword,
        });
        const registeredUser = await this.userRepository.save(newUser);
        return registeredUser;
    }
    async findOne(id, email) {
        const user = await this.userRepository.findOneBy({
            id: id,
            email: email
        });
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOneBy({
            email: email,
        });
        return user;
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.userRepository.update(id, {
            ...updateUserDto
        });
        return updatedUser;
    }
    async remove(id) {
        const user = await this.userRepository.delete(id);
        if (!user) {
            throw new Error("User not found");
        }
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map