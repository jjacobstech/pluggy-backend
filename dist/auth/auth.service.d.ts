import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/modules/users/users.service";
import { AuthResponse } from "./dto/Auth.types";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterUserDto): Promise<AuthResponse>;
    logIn(LoginUserDto: LoginUserDto): Promise<AuthResponse>;
    Logout(id: string, email: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
}
