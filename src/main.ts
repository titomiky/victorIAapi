import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors'; // Import cors library
import { Logger } from 'nestjs-pino';


async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, 
    new ExpressAdapter(expressApp),
    {cors: {
      origin: '*',
    }}, 
  );
  
  
  const config = new DocumentBuilder()
  .setTitle('VictorIA API Documentation')
  .setDescription('VictorIA API Documentation')
  .setVersion('1.1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.setBaseViewsDir(path.join(__dirname, 'views'));
  app.setViewEngine('ejs');

  // Servir archivos estáticos desde la carpeta 'public'
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  const corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:' + process.env.PORT], // Replace with allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  };

  app.use(cors(corsOptions)); 
  app.useLogger(app.get(Logger));
  
  await app.listen(process.env.PORT);
}

bootstrap();
