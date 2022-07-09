import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('The backend API description')
    .setVersion('1.0')
    .addTag('npcirs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidateInputPipe({ disableErrorMessages: false }));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
