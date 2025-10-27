import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): {
        dto: LoginUserDto;
    };
    logout(id: string, email: string): Promise<void>;
    register(registerUserDto: RegisterUserDto): Promise<{
        user: import("../database/entities/user.entity").User;
        access_token: string;
    }>;
}
