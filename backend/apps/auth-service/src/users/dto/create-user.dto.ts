import { Exclude, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RolesEnum } from '../../const/roles.consts';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(4)
  @IsOptional()
  @Exclude({
    toPlainOnly: true,
  })
  password?: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  role?: RolesEnum;

  @IsString()
  @IsOptional()
  oauthProvider?: string;

  @IsString()
  @IsOptional()
  oauthUserId?: string;
}
