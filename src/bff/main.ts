import { join } from 'path';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static(join(process.cwd(), 'dist/client/')));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
