import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import simpleGit from 'simple-git';

async function bootstrap() {

  dotenv.config({ path: '.env' });

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const excludedBranches = process.env.SWAGGER_EXCLUDE?.split(',') || [];  
  const git = simpleGit();
  const branch = await git.revparse(['--abbrev-ref', 'HEAD']);

  if (!excludedBranches.includes(branch)) {
    const config = new DocumentBuilder()
      .setTitle('API Endpoints')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
