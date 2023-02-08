import { Module } from '@nestjs/common';
import { HomeSliderService } from './home_slider.service';
import { HomeSliderResolver } from './home_slider.resolver';
import { S3ClientProvider } from '../aws/s3-clients.provider';
import { DbClientsProvider } from '../dynamoDB/db-clients.provider';

@Module({
  providers: [HomeSliderResolver, HomeSliderService, S3ClientProvider, DbClientsProvider]
})
export class HomeSliderModule {}
