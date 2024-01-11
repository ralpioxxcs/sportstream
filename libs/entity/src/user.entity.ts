import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity()
export class UserModel extends BaseModel {
  @Column({
    length: 20,
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  oauthProvider: string;

  @Column()
  oauthUserId: string;
}
