import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import type { Express, Request, Response } from 'express';
import { AppModule } from '../dist/src/app.module.js';
import { ResponseInterceptor } from '../dist/src/common/interceptors/response.interceptor.js';
import { HttpExceptionFilter } from '../dist/src/common/filters/http-exception.filter.js';

let cachedApp: Express | null = null;

async function bootstrap(): Promise<Express> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ZodValidationPipe());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }
  return cachedApp;
}

export default async function handler(req: Request, res: Response) {
  const app = await bootstrap();
  app(req, res);
}
