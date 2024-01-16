import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@app/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
