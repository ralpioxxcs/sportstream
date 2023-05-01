import { Controller, Get } from '@nestjs/common';
import { getgid } from 'process';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getDirectors(): string[] {
    return ["Christopher Nolan", "Denis Villeneuve"];
  }

}
