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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../modules/users/users.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const user_exists = await this.userService.findByEmail(registerDto.email);
        if (user_exists) {
            throw new common_1.ConflictException('User already exists');
        }
        const new_user = await this.userService.create(registerDto);
        const payload = { user_id: new_user?.id, user_email: new_user?.email };
        const token = this.jwtService.sign(payload);
        if (!token) {
            throw new common_1.HttpException('Token generation failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { user: {
                id: new_user?.id,
                email: new_user?.email,
                name: new_user?.name,
            },
            access_token: token };
    }
    async logIn(LoginUserDto) {
        const user = await this.userService.findByEmail(LoginUserDto.email);
        const hashedPassword = user?.password ?? "";
        const isPasswordMatch = bcrypt_1.default.compare(LoginUserDto.password, hashedPassword);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { user_id: user?.id, user_email: user?.email };
        const token = this.jwtService.sign(payload);
        return { user: {
                id: user?.id,
                email: user?.email,
                name: user?.name,
            },
            access_token: token };
    }
    async Logout(id, email) {
        const user = await this.userService.findOne(id, email);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            user: {
                id: user?.id,
                email: user?.email,
                name: user?.name,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map