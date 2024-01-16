import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GithubLoginDto } from './dto/github-login.dto';
import { GithubService } from './github.service';
import { AuthService } from '../../auth.service';

@Controller({
  path: 'auth/oauth/github',
  version: '1',
})
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly authService: AuthService,
  ) {}

  @Get('callback')
  @HttpCode(HttpStatus.OK)
  async loginGithub(@Query('code') code: string) {
    return code;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: GithubLoginDto) {
    console.log(loginDto);

    const socialData = await this.githubService.getProfileByToken(loginDto);

    return this.authService.loginSocialUser('github', socialData);
  }
}
