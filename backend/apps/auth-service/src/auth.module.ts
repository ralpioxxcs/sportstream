import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ENV_DB_HOST_KEY,
  ENV_DB_NAME_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from './const/env-keys.consts';
import { UserModel } from '@app/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LocalStrategy } from './strategies/local.strategy';
import { HttpStrategy } from './strategies/http.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GithubModule } from './oauth/github/github.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../.env`,
    }),
    UsersModule,
    JwtModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[ENV_DB_HOST_KEY],
      port: Number(process.env[ENV_DB_PORT_KEY]),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_NAME_KEY],
      entities: [UserModel],
      synchronize: true,
      logging: true,
    }),
    GithubModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    HttpStrategy,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AuthModule {}
