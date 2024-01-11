import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { GithubLoginDto } from './dtos/github-login.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, lastValueFrom, map, tap } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger();

  github_code_endpoint = 'https://github.com/login/oauth/authorize';
  github_auth_endpoint = 'https://github.com/login/oauth/access_token';

  registerWithEmail(dto: SignUpUserDto) {}

  async getAccessToken(code: string) {
    const reqBody = {
      client_id: this.configService.get('GITHUB_CLIENT_ID', { infer: true }),
      client_secret: this.configService.get('GITHUB_CLIENT_SECRETS', {
        infer: true,
      }),
      code: code,
    };

    this.logger.log(reqBody);

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.github_auth_endpoint, reqBody).pipe(
          catchError((err: AxiosError<Buffer>) => {
            throw err;
          }),
        ),
      );

      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
