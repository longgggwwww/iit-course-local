import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { json, static as static_ } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api');
  app.use('/uploads', static_('upload'));
  app.enableCors();
  app.use(json({ limit: '200mb' }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const cfgService = app.get(ConfigService);
  await app.listen(cfgService.get<number>('PORT'));
}
bootstrap();
