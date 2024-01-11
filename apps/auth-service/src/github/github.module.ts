import { Module } from '@nestjs/common';
import { GithubStrategy } from './github.stratedy';
import { GithubController } from './github.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [GithubController],
  providers: [GithubStrategy],
})
export class GithubModule {}
