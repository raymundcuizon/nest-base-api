import DataLoader from 'dataloader';
import { Portfolio } from './entities/portfolio.entity';

export interface IDataloaders {
  portfolioLoader: DataLoader<string, Portfolio>;
}