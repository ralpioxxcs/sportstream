import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { GithubLoginDto } from './dto/github-login.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ENV_OAUTH_GITHUB_CLIENT_ID,
  ENV_OAUTH_GITHUB_CLIENT_SECRETS,
} from '../../const/env-keys.consts';
import { catchError, firstValueFrom } from 'rxjs';
import { SocialInterface } from '../../interfaces/social.interface';

@Injectable()
export class GithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.clientId = configService.get<string>(ENV_OAUTH_GITHUB_CLIENT_ID);
    this.clientSecret = configService.get<string>(
      ENV_OAUTH_GITHUB_CLIENT_SECRETS,
    );
  }

  clientId: string;
  clientSecret: string;
  github_auth_endpoint = 'https://github.com/login/oauth/access_token';
  github_user_endpoint = 'https://api.github.com/user';

  async getProfileByToken(loginDto: GithubLoginDto): Promise<SocialInterface> {
    let { data } = await firstValueFrom(
      this.httpService
        .post(
          this.github_auth_endpoint,
          {},
          {
            headers: {
              Accept: 'application/json',
            },
            params: {
              client_id: this.clientId,
              client_secret: this.clientSecret,
              code: loginDto.code,
            },
          },
        )
        .pipe(
          catchError((err) => {
            throw new UnauthorizedException(err);
          }),
        ),
    );

    const accessToken = data.access_token;
    if (!accessToken) {
       throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'wrong token',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const response = await firstValueFrom(
      this.httpService
        .get(this.github_user_endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((err) => {
            throw new UnauthorizedException(err);
          }),
        ),
    );

    const user = response.data;

    return {
      id: user['id'],
      email: user['email'],
    };
  }
}
