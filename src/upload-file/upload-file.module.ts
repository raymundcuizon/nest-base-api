import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileResolver } from './upload-file.resolver';
import { S3ClientProvider } from 'src/aws/s3-clients.provider';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';

@Module({
  providers: [UploadFileResolver, UploadFileService, S3ClientProvider, DbClientsProvider]
})
export class UploadFileModule {}
