/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { env } from '../config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['access_token'];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Verifique se o payload está correto
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
