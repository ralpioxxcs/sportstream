import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  public async validate(email: string, password: string) : Promise<any> {
    


  }

}
