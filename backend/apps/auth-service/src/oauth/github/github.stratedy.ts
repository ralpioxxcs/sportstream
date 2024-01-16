import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-github';
import { UsersService } from '../../users/users.service';
import {
    ENV_OAUTH_GITHUB_CALLBACK_URL,
  ENV_OAUTH_GITHUB_CLIENT_ID,
  ENV_OAUTH_GITHUB_CLIENT_SECRETS,
} from '../../const/env-keys.consts';
import { UserModel } from '@app/entity/user.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    console.log(configService.get<string>(ENV_OAUTH_GITHUB_CLIENT_ID));
    super({
      clientID: configService.get<string>(ENV_OAUTH_GITHUB_CLIENT_ID),
      clientSecret: configService.get<string>(ENV_OAUTH_GITHUB_CLIENT_SECRETS),
      callbackURL: configService.get<string>(ENV_OAUTH_GITHUB_CALLBACK_URL),
    });
  }

  async validate(
    access: string,
    refresh: string,
    profile: Profile,
  ): Promise<UserModel> {
    const { username } = profile;

    let primaryEmail: string;
    if (profile.emails.length > 0) {
      primaryEmail = profile.emails[0].value;
    }

    console.log(`username: ${username}, email : ${primaryEmail}`);
    console.log(`github access: ${access}, refresh: ${refresh}`);

    // Check username is exists in database,
    //  * if not exists -> create new user
    //  * if exists -> return exact user
    const oauthUser = await this.usersService.findOrCreate({
      name: username,
      email: primaryEmail,
      oauthProvider: 'github',
      oauthUserId: profile.id,
    });
    if (!oauthUser) {
      throw new UnauthorizedException('failed to authorize github');
    }

    return oauthUser;
  }
}
