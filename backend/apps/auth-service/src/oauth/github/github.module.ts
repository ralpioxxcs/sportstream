import { Module } from '@nestjs/common';
import { GithubStrategy } from './github.stratedy';
import { GithubController } from './github.controller';
import { UsersModule } from '../../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from './github.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [HttpModule, UsersModule, AuthModule],
  controllers: [GithubController],
  providers: [GithubService, GithubStrategy],
})
export class GithubModule {}
