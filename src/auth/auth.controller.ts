import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return { dto: loginUserDto };
    // return this.authService.logIn(loginUserDto);
  }

  @Post('logout')
  logout(@Body() id: string, email: string) {
    return this.authService.Logout(id, email);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
