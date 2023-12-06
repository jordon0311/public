import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaExceptionsFilter } from "src/controllers/middleware/prismaExceptionFilter";
import { AllExceptionsFilter } from "src/controllers/middleware/safetyNet";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  /** Validation Middleware */
  app.useGlobalPipes(new ValidationPipe());
  /** Open API documentation */
  const config = new DocumentBuilder()
    .setTitle("Wetpages API")
    .setDescription("The main API for Wetpages")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  /** End Open API documentation  */

  /** Error Handling */
  const host = app.get(HttpAdapterHost);
  /** More specific handlers go towards the bottom */
  app.useGlobalFilters(new AllExceptionsFilter(host));
  app.useGlobalFilters(new PrismaExceptionsFilter(host));
  await app.listen(3001);
}

void bootstrap();
