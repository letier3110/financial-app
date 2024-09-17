import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
// import * as dotenv from 'dotenv';

// dotenv.config();

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
