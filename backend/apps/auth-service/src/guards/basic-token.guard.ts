import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const rawToken = request.header('authorization');
    if (!rawToken) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'empty authorization token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // extract token from authorization string
    // -> 'Basic <token_string>'
    let splitted = rawToken.split(' ');
    if (splitted.length !== 2 || splitted[0] !== 'Basic') {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'invalid authorization token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const encodeedToken = splitted[1];

    // decode token -> <email:password>
    const decodedToken = Buffer.from(encodeedToken, 'base64').toString('utf-8');
    splitted = decodedToken.split(':');
    if (splitted.length !== 2) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'invalid authorization token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // basic email authentication
    const email = splitted[0];
    const password = splitted[1];

    request.headers['email'] = email;
    request.headers['password'] = password;

    return true;
  }
}
