import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  oauthProvider?: string;

  @IsString()
  @IsOptional()
  oauthUserId?: string;
}
