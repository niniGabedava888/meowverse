import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() requestBody: LoginRequestDto) {
    return this.authService.login(requestBody);
  }

  @Post('register')
  async register(@Body() requestBody: RegisterRequestDto) {
    return this.authService.register(requestBody);
  }
}
