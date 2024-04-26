import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const config = new DocumentBuilder()
  .setTitle('VictorIA API Documentation')
  .setDescription('VictorIA API Documentation')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
