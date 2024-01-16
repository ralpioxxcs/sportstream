import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailLoginDto } from './dto/email-login.dto';
import { UserModel } from '@app/entity/user.entity';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/signup-user.dto';
import {
  ENV_JWT_REFRESH_SECRET,
  ENV_JWT_REFRESH_TOKEN_EXPIRES_IN,
  ENV_JWT_SECRET,
  ENV_JWT_TOKEN_EXPIRES_IN,
} from './const/env-keys.consts';
import { RolesEnum } from './const/roles.consts';
import { SocialInterface } from './interfaces/social.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger();

  async loginUser(user: Pick<UserModel, 'id' | 'email'>) {
    const { accessToken, refreshToken } = await this.signingToken({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async loginSocialUser(authProvider: string, socialData: SocialInterface) {}

  async registerWithEmail(signUpUserDto: SignUpUserDto): Promise<UserModel> {
    return await this.userService.createUser({
      ...signUpUserDto,
      role: RolesEnum.USER,
    });
  }

  async validateUser(emailLoginDto: EmailLoginDto): Promise<UserModel> {
    // Find user
    const user = await this.userService.getUserByEmail(emailLoginDto.email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'not exists user',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Validate password
    //  1. 입력된 비밀번호
    //  2. 기존 해시
    const passwordOk = await bcrypt.compare(
      emailLoginDto.password,
      user.password,
    );
    if (!passwordOk) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'invalid password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  private async signingToken(data: {
    id: UserModel['id'];
    email: UserModel['email'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow<string>(
      ENV_JWT_TOKEN_EXPIRES_IN,
      { infer: true },
    );
    const refreshTokenExpiresIn = this.configService.getOrThrow<string>(
      ENV_JWT_REFRESH_TOKEN_EXPIRES_IN,
      { infer: true },
    );

    const [access, refresh] = await Promise.all([
      await this.jwtService.signAsync(
        {
          iss: 'sportsstream',
          id: data.id,
          sub: data.email,
        },
        {
          secret: this.configService.get<string>(ENV_JWT_SECRET),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          iss: 'sportsstream',
          id: data.id,
          sub: data.email,
        },
        {
          secret: this.configService.get<string>(ENV_JWT_REFRESH_SECRET),
          expiresIn: refreshTokenExpiresIn,
        },
      ),
    ]);

    return {
      accessToken: access,
      refreshToken: refresh,
    };
  }
}
