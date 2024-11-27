import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'localhost:3000',
      'http://localhost',
      'http://app.localhost',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  const config = new DocumentBuilder()
    .setTitle('WeStiti API')
    .setDescription('WeStiti description')
    .setVersion('0.0.1')
    .addTag('westiti')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
