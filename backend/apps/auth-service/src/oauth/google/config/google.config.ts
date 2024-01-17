import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import { GoogleConfig } from './google-config.type';
import validateConfig from '@app/utils/validate-config';
import {
  ENV_OAUTH_GOOGLE_CLIENT_ID,
  ENV_OAUTH_GOOGLE_CLIENT_SECRETS,
} from 'apps/auth-service/src/const/env-keys.consts';

class EnvironmentVariablesValidator {
  @IsString() @IsOptional() GOOGLE_CLIENT_ID: string;
  @IsString() @IsOptional() GOOGLE_CLIENT_SECRETS: string;
}

export default registerAs<GoogleConfig>('google', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    clientId: process.env[ENV_OAUTH_GOOGLE_CLIENT_ID],
    clientSecret: process.env[ENV_OAUTH_GOOGLE_CLIENT_SECRETS],
    //redirectURIs: 
  };
});
