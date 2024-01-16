import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @Length(2, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4)
  password: string;
}
