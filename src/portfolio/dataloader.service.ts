import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
// import { Friend } from '../friend/friend.entity';
// import { FriendService } from '../friend/friend.service';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { IDataloaders } from './dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly portfolioService: PortfolioService) {}

//   getLoaders(): IDataloaders {
//     const portfolioLoader = this._createPortfoliosLoader();
//     return {
//         portfolioLoader,
//     };
//   }

//   private _createPortfoliosLoader() {
//     return new DataLoader<string, Portfolio>(
//       async (sk: string) =>
//         await this.portfolioService.getCategoryPortfolios(sk),
//     );
//   }
}