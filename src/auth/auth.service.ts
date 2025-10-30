import {
  Injectable,
  UnauthorizedException,
  HttpException,
  ConflictException,
  HttpStatus
} from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/modules/users/users.service";
import { AuthResponse } from "./dto/Auth.types";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterUserDto): Promise<AuthResponse> {

    const user_exists = await this.userService.findByEmail(registerDto.email);

    if (user_exists) {
      throw new ConflictException('User already exists');
    }

    const new_user = await this.userService.create(registerDto);
    const payload = { user_id: new_user?.id, user_email: new_user?.email };
    const token = this.jwtService.sign(payload);

    if (!token){
      throw new  HttpException('Token generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { user:{
      id: new_user?.id,
      email: new_user?.email,
      name: new_user?.name,
    },
      access_token: token };
  }

  async logIn(LoginUserDto: LoginUserDto): Promise<AuthResponse> {
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

    return { user:{
      id: user?.id,
      email: user?.email,
      name: user?.name,
    } ,
       access_token: token };
  }

  async Logout(id: string, email: string) {
    const user = await this.userService.findOne(id, email);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      user:{
        id: user?.id,
        email: user?.email,
        name: user?.name,
      },
      }


  }
}
