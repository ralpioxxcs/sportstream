import { IsOptional, IsString } from "class-validator";

export class EnvironmentVairablesValidator {
  @IsString()
  @IsOptional()
  GITHUB_CLIENT_ID: string;

  @IsString()
  @IsOptional()
  GITHUB_CLIENT_SECRETS: string;
}
