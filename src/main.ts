import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './helpers/setup-swagger.helper';
import { useRequestLogging } from './helpers/request-logging.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  const loggerBootstrap = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  useRequestLogging(app);
  setupSwagger(app);

  await app.listen(process.env.PORT);
  loggerBootstrap.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
