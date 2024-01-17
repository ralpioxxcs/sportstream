import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller({
  path: 'auth/oauth/google',
  version: '1',
})
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('callback')
  @HttpCode(HttpStatus.OK)
  async callback(@Query('code') code: string) {
    return code;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: GoogleLoginDto) {
    const socialData = await this.googleService.getProfileByIdToken(loginDto);

    return socialData;
  }
}
