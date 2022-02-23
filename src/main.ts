import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger documentation generator configuration.
  // TODO: move this out to a config file.
  const config = new DocumentBuilder()
    .setTitle('Catflix API')
    .setDescription('Catflix™ is the leading streamer of cat videos around the globe.')
    .setVersion('1.1')
    .build();

  // Set the swagger module up, and add the endpoints.
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening for the requests.
  // TODO: move port number to a config file.
  await app.listen(3000);

  // Webpack Hot Module Replacement is used to speed up development.
  // Here we check whether we should patch the running app instance.
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}

bootstrap();
