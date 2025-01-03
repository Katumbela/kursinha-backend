/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'reputacao3602024',
    });
  }
  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Verifique se o payload está correto
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
