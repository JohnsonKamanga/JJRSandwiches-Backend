import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");//all endpoints are accessiblbe through api eg. api/recipe
  const configService = app.get(ConfigService);
  const port = process.env.PORT || 10000 ;
  app.enableCors();
  await app.listen(port);
}
bootstrap();
