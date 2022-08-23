import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix("api/v1");
  
  const config = new DocumentBuilder()
    .setTitle('Telzir FaleMais')
    .setDescription('Telzir FaleMais API description')
    .setVersion('1.0')
    .addTag('telzir')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
