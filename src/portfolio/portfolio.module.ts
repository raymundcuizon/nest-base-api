import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioResolver } from './portfolio.resolver';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';
import { DataloaderService } from './dataloader.service';

@Module({
  providers: [PortfolioResolver, PortfolioService, DbClientsProvider, DataloaderService],
  exports:[PortfolioResolver, DataloaderService, PortfolioService]
})
export class PortfolioModule {}
