import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: process.env.NODE_ENV === 'production'
        ? (errors) => new BadRequestException('Bad Request')
        : undefined, // undefined means use default behavior
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
