import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleLoginDto } from './dto/google-login.dto';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../../interfaces/social.interface';

@Injectable()
export class GoogleService {
  private google: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.google = new OAuth2Client(
      configService.get('google.clientId', { infer: true }),
      configService.get('google.clientSecret', { infer: true }),
    );
  }

  async getProfileByIdToken(loginDto: GoogleLoginDto): Promise<SocialInterface> {
    const { tokens } = await this.google.getToken(loginDto.code);
    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.google.verifyIdToken

    const tokenInfo = await this.google.getTokenInfo(tokens.access_token);

    return {
      id: tokenInfo.user_id,
      email: tokenInfo.email,
    }

  }
}
