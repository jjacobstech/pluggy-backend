import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as argon from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterUserDto) {
    const user = await this.userService.create(registerDto);

    const payload = { user_id: user?.id, user_email: user?.email };
    const token = this.jwtService.sign(payload);

    return { user: user, access_token: token };
  }

  async logIn(LoginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(LoginUserDto.email);
    const hashedPassword = user?.password ?? "";
    const isPasswordMatch = bcrypt.compare(
      LoginUserDto.password,
      hashedPassword
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { user_id: user?.id, user_email: user?.email };
    const token = this.jwtService.sign(payload);

    return { user: user, access_token: token };
  }

  async Logout(id: string, email: string) {
    const user = await this.userService.findOne(id, email);

    if (!user) {
      throw new Error("User not found");
    }
  }
}
