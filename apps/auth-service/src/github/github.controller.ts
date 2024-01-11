import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GithubOauthGuard } from './github.guard';
import { Request } from 'express';
import { Profile } from 'passport';

@Controller({
  path: 'auth/github',
  version: '1',
})
export class GithubController {
  constructor() {}

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  @HttpCode(HttpStatus.OK)
  async loginGithub(@Req() req: Request) {
    const user = req.user as Profile;

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return payload;
  }

  //return { accessToken: this.jwtService.sign(payload)}
}
