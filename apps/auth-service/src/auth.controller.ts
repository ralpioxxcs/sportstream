import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/login')
  loginEmail() {}

  @Post('email/register')
  signUpEmail(@Body() signupDto: SignUpUserDto) {
    return this.authService.registerWithEmail(signupDto);
  }
}
