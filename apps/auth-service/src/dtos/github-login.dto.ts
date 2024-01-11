import { IsNotEmpty } from 'class-validator';

export class GithubLoginDto {
  @IsNotEmpty()
  code: string;
}
