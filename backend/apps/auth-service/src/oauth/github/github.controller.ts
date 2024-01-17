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
import { UsersService } from '../../users/users.service';
import { UserModel } from '@app/entity/user.entity';
import { AuthService } from '../../auth/auth.service';

@Controller({
  path: 'auth/oauth/github',
  version: '1',
})
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Query('code') code: string) {
    return code;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: GithubLoginDto) {
    const socialData = await this.githubService.getProfileByCode(loginDto);
    console.log(socialData);

    let user: UserModel;
    user = await this.userService.getUserByEmail(socialData.email);
    console.log(user);

    if (!user) {
      console.log('not exists user, create new');
      user = await this.authService.registerWithSocial('github', socialData);
    }
    return this.authService.loginUser(user);
  }
}
