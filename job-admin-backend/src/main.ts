import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

global.crypto = require('crypto'); // Fixes crypto error

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔧 Enable CORS
  app.enableCors({
    origin: '*', // Use '*' for testing OR replace with your Vercel frontend URL
  });

  // ✅ Set global prefix like /api/*
  app.setGlobalPrefix('api');

  // ✅ Listen on port 3001 or Render-assigned port
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
