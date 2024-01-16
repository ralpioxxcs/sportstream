import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from '@app/entity/user.entity';
import { SignUpUserDto } from './dto/signup-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/register')
  @HttpCode(HttpStatus.OK)
  async signUpEmail(@Body() signUpDto: SignUpUserDto): Promise<UserModel> {
    return this.authService.registerWithEmail(signUpDto);
  }

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('http'))
  async loginEmail(@Request() req: Request) {
    if (!req['user']) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: 'failed to authenticate user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.authService.loginUser(req['user']);
  }

  @Get('email/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Request() req): Promise<UserModel> {
    return req['user'];
  }
}
