import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { ConfigModule } from '@nestjs/config';
import googleConfig from './config/google.config';
import { UsersModule } from '../../users/users.module';
import { GoogleService } from './google.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleConfig],
    }),
    UsersModule,
  ],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}
