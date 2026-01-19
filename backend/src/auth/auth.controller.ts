import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: any) {
    // Primeiro validamos o usuário (email e senha)
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    // Se estiver ok, retornamos o token JWT
    return this.authService.login(user);
  }
}