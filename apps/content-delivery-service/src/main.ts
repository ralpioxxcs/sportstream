import { NestFactory } from '@nestjs/core';
import { ContentDeliveryServiceModule } from './content-delivery-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ContentDeliveryServiceModule);
  await app.listen(3000);
}
bootstrap();
