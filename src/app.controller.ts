import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(AppInterceptor)
  getHello(@Req() req: Request, @Res() res: Response): any {
    return res.json(req.body);
  }
}
