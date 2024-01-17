import { UserModel } from '@app/entity/user.entity';

export type HttpPayloadType = Pick<UserModel, 'email' | 'password'>;
