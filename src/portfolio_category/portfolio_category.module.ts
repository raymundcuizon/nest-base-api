import { Module } from '@nestjs/common';
import { PortfolioCategoryService } from './portfolio_category.service';
import { PortfolioCategoryResolver } from './portfolio_category.resolver';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';
import { PortfolioService } from 'src/portfolio/portfolio.service';
// import { S3ClientProvider } from 'src/aws/s3-clients.provider';

@Module({
  providers: [
    PortfolioService,
    PortfolioCategoryResolver, 
    PortfolioCategoryService, 
    // S3ClientProvider, 
    DbClientsProvider],
    
})
export class PortfolioCategoryModule {}
