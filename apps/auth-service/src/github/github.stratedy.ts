import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-github';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRETS'),
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const { username, emails } = profile;

    console.log(emails);

    const user = this.usersService.findOrCreate({
      name: username,
      email: 'asdasd@naver.com',
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
