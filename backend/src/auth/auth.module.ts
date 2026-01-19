import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importante para o AuthService encontrar o UsersService
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // A estratégia que valida o token

@Module({
  imports: [
    UsersModule, // Resolve o erro 'UnknownDependenciesException' da imagem anterior
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Use a mesma chave que definiu na JwtStrategy
      signOptions: { expiresIn: '1d' }, // Token válido por 1 dia
    }),
  ],
  providers: [AuthService, JwtStrategy], // Adicione a JwtStrategy aqui
  controllers: [AuthController],
})
export class AuthModule {}