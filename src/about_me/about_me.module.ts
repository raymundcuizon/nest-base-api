import { Module } from '@nestjs/common';
import { AboutMeService } from './about_me.service';
import { AboutMeResolver } from './about_me.resolver';
import { DbClientsProvider } from "../dynamoDB/db-clients.provider";

@Module({
  providers: [AboutMeResolver, AboutMeService, DbClientsProvider]
})
export class AboutMeModule {}
