import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayloadType } from './types/jwt-payload.type';
import { ENV_JWT_SECRET } from '../const/env-keys.consts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(ENV_JWT_SECRET),
    });
  }

  public validate(payload: JwtPayloadType): JwtPayloadType {
    //console.log('enter validate', payload);

    if(!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
