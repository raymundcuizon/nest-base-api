import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { graphqlUploadExpress } from "graphql-upload-minimal";

require('dotenv').config({ path: `../.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  
  // app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));
  await app.listen(3000);
}
bootstrap();
