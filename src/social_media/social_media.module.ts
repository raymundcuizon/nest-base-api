import { Module } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { SocialMediaResolver } from './social_media.resolver';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';

@Module({
  providers: [SocialMediaResolver, SocialMediaService, DbClientsProvider]
})
export class SocialMediaModule {}
