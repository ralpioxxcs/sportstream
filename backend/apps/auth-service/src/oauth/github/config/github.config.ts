import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import { GithubConfig } from './github-config.type';
import validateConfig from '@app/utils/validate-config';
import {
  ENV_OAUTH_GITHUB_CLIENT_ID,
  ENV_OAUTH_GITHUB_CLIENT_SECRETS,
} from 'apps/auth-service/src/const/env-keys.consts';

class EnvironmentVairablesValidator {
  @IsString() @IsOptional() GITHUB_CLIENT_ID: string;
  @IsString() @IsOptional() GITHUB_CLIENT_SECRETS: string;
}

export default registerAs<GithubConfig>('github', () => {
  validateConfig(process.env, EnvironmentVairablesValidator);

  return {
    clientId: process.env[ENV_OAUTH_GITHUB_CLIENT_ID],
    clientSecret: process.env[ENV_OAUTH_GITHUB_CLIENT_SECRETS],
  };
});
