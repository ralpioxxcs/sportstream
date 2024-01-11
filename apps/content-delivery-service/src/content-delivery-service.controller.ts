import { Controller, Get } from '@nestjs/common';
import { ContentDeliveryServiceService } from './content-delivery-service.service';

@Controller()
export class ContentDeliveryServiceController {
  constructor(private readonly contentDeliveryServiceService: ContentDeliveryServiceService) {}

  @Get()
  getHello(): string {
    return this.contentDeliveryServiceService.getHello();
  }
}
