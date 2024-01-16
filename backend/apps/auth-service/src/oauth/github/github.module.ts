import { Module } from '@nestjs/common';
import { GithubStrategy } from './github.stratedy';
import { GithubController } from './github.controller';
import { UsersModule } from '../../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from './github.service';

@Module({
  imports: [UsersModule, HttpModule],
  controllers: [GithubController],
  providers: [GithubService, GithubStrategy],
})
export class GithubModule {}
