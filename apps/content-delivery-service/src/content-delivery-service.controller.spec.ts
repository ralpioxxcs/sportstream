import { Test, TestingModule } from '@nestjs/testing';
import { ContentDeliveryServiceController } from './content-delivery-service.controller';
import { ContentDeliveryServiceService } from './content-delivery-service.service';

describe('ContentDeliveryServiceController', () => {
  let contentDeliveryServiceController: ContentDeliveryServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContentDeliveryServiceController],
      providers: [ContentDeliveryServiceService],
    }).compile();

    contentDeliveryServiceController = app.get<ContentDeliveryServiceController>(ContentDeliveryServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(contentDeliveryServiceController.getHello()).toBe('Hello World!');
    });
  });
});
