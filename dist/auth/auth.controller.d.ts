import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<import("./dto/Auth.types").AuthResponse>;
    logout(id: string, email: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    register(registerUserDto: RegisterUserDto): Promise<import("./dto/Auth.types").AuthResponse>;
}
