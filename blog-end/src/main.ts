import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { TransformInterceptor } from './Interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new Validate());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3310);
}
bootstrap();
