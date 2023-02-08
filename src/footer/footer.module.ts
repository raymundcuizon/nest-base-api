import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterResolver } from './footer.resolver';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';

@Module({
  providers: [FooterResolver, FooterService, DbClientsProvider]
})
export class FooterModule {}
