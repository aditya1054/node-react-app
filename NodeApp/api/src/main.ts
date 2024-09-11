import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  /** ----- Swagger Code Start -----   */

  const config = new DocumentBuilder()
    .setTitle("Api")
    .setDescription("Api testing")
    .setVersion('1.0')
    //.addTag('Api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Api', app, document);

  /** ----- Swagger Code End -----   */
  app.enableCors();
  await app.listen(3001);

}

bootstrap();
