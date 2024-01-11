import { NestFactory } from '@nestjs/core';
import { UserProfileServiceModule } from './user-profile-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserProfileServiceModule);
  await app.listen(3000);
}
bootstrap();
