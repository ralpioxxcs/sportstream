import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.entity';
import { RolesEnum } from 'apps/auth-service/src/const/roles.consts';
import { Exclude } from 'class-transformer';

@Entity()
export class UserModel extends BaseModel {
  @Column({
    length: 20,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  oauthProvider?: string;

  @Column({
    nullable: true,
  })
  oauthUserId?: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
  })
  role: RolesEnum;
}
