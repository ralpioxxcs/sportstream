import { Module } from '@nestjs/common';
import { ContentDeliveryServiceController } from './content-delivery-service.controller';
import { ContentDeliveryServiceService } from './content-delivery-service.service';

@Module({
  imports: [],
  controllers: [ContentDeliveryServiceController],
  providers: [ContentDeliveryServiceService],
})
export class ContentDeliveryServiceModule {}
