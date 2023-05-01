import { NotImplementedException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Router } from 'express';
import { stringify } from 'querystring';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();