import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module';
import { ConfigService } from './shared/config.service';
import { SharedModule } from './shared/shared.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.select(SharedModule).get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000,'localhost');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
