import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Mesma chave usada no AuthModule
    });
  }

  async validate(payload: any) {
    // O que retornar aqui ficará disponível em req.user
    return { userId: payload.sub, email: payload.email };
  }
}