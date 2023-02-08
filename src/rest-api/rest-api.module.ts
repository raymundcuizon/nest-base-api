import { Module } from '@nestjs/common';
import { RestApiService } from './rest-api.service';
import { RestApiController } from './rest-api.controller';
import { S3ClientProvider } from 'src/aws/s3-clients.provider';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';

@Module({
  controllers: [RestApiController],
  providers: [RestApiService, S3ClientProvider, DbClientsProvider]
})
export class RestApiModule {}
