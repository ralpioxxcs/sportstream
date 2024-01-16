import { UserModel } from '@app/entity/user.entity';

export type JwtPayloadType = Pick<UserModel, 'id' | 'email'> & {
  sub: string;
  iat: number;
  exp: number;
};
