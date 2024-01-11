import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtAuthService } from './jwt-auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [JwtAuthStrategy, JwtAuthService],
})
export class JwtModule {}
