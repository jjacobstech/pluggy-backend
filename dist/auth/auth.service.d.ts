import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterUserDto): Promise<{
        user: import("../database/entities/user.entity").User;
        access_token: string;
    }>;
    logIn(LoginUserDto: LoginUserDto): Promise<{
        user: import("../database/entities/user.entity").User | null;
        access_token: string;
    }>;
    Logout(id: string, email: string): Promise<void>;
}
