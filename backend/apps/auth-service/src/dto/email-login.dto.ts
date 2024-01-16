import { lowerCaseTransformer } from '@app/utils/lower-case.transformer';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailLoginDto {
  //@Transform(lowerCaseTransformer)
  @Transform(({ value }) => {
    return value?.toLowercase().trim();
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
