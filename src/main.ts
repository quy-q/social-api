import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WebSocketGateway } from '@nestjs/websockets';
import { AppModule } from './app.module';
import { SwaggerClient } from './config/swagger/client.swagger';
import { SwaggerCms } from './config/swagger/cms.swagger';
require('dotenv').config();

const bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'debug', 'verbose', 'warn', 'error'],
  });
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  /**
   * Swagger config
   */
  SwaggerClient(app);
  SwaggerCms(app);

  await app.listen(process.env.PORT || 3002, () => {
    Logger.log(
      `Server running on http://localhost:3000`,
      `Server document API BACKEND running on http://localhost:3002/client`,
      'Server document API BACKEND running on http://localhost:3000/backend',
      'Bootstrap',
    );
  });
}
bootstrap();
