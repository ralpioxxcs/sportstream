import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { AuthService } from '../auth.service';
import { Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { HttpPayloadType } from './types/http-payload.type';

@Injectable()
export class HttpStrategy extends PassportStrategy(BasicStrategy, 'http') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        realm: 'user',
        passReqToCallback: false, // request를 verify callback으로 넘겨줌
      },
      // (
      //   username: string,
      //   password: string,
      //   done: (error: any, user?: any) => void,
      // ) => {
      //   const user = this.authService.validateUser({
      //     email: username,
      //     password: password,
      //   });
      //   if (!user) {
      //     done(null, false);
      //   }
      //   return done(null, user);
      // },
    );
  }

  public async validate(payload: HttpPayloadType) {
    console.log('enter validate');

    const user = await this.authService.validateUser({
      email: payload.email,
      password: payload.password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
