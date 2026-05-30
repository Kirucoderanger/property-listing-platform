import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import {
  ValidationPipe
} from '@nestjs/common';

import {
  SwaggerModule,
  DocumentBuilder
} from '@nestjs/swagger';

async function bootstrap() {

  const app =
    await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config =
    new DocumentBuilder()
      .setTitle('Property Listing API')
      .setDescription(
        'Multi-tenant property listing platform API'
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});

  await app.listen(5000);

  console.log(
    `Server running on:
     http://localhost:5000`
  );

  console.log(
    `Swagger docs:
     http://localhost:5000/api`
  );
}

bootstrap();