import { Resolver, Query, Mutation, Args, Int, ResolveField, Context, Parent } from '@nestjs/graphql';
import { PortfolioCategoryService } from './portfolio_category.service';
import { PortfolioCategory } from './entities/portfolio_category.entity';
import { CreatePortfolioCategoryInput } from './dto/create-portfolio_category.input';
import { UpdatePortfolioCategoryInput } from './dto/update-portfolio_category.input';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { PortfolioService } from "../portfolio/portfolio.service"
import * as DataLoader from 'dataloader';


@Resolver(() => PortfolioCategory)
export class PortfolioCategoryResolver {
  constructor(private readonly portfolioCategoryService: PortfolioCategoryService, private readonly portfolioService: PortfolioService) {}

  @Mutation(() => PortfolioCategory)
  createPortfolioCategory(@Args('createPortfolioCategoryInput') createPortfolioCategoryInput: CreatePortfolioCategoryInput) {
    return this.portfolioCategoryService.create(createPortfolioCategoryInput);
  }

  @Query(() => [PortfolioCategory], { name: 'getAllPortfolioCategories' })
  findAll() {
    return this.portfolioCategoryService.findAll();
  }

  @Query(() => PortfolioCategory, { name: 'findOneCategoryPortfolio' })
  findOne(@Args('sk', { type: () => String }) sk: string) {
    return this.portfolioCategoryService.findOne(sk);
  }

  @ResolveField('portfolios', () => [Portfolio])
  async getCategoryPortfolios(@Parent() portfolioCategory: PortfolioCategory) {
    const { sk } = portfolioCategory;
    return await this.portfolioService.getAllPortfolioBySk(sk);
  }

  // @ResolveField('portfolios', () => [Portfolio])
  // getCategoryPortfolios(
  //   @Parent() portfolioCategory: PortfolioCategory,
  //   @Context('portfolioLoader') portfolioLoader: DataLoader<string, Portfolio>,
  // ) {
  //   const { sk } = portfolioCategory;
  //   return portfolioLoader.load(sk);
  // }
  // @Query(() => PortfolioCategory, { name: 'portfolioCategory' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.portfolioCategoryService.findOne(id);
  // }

  // @Mutation(() => PortfolioCategory)
  // updatePortfolioCategory(@Args('updatePortfolioCategoryInput') updatePortfolioCategoryInput: UpdatePortfolioCategoryInput) {
  //   return this.portfolioCategoryService.update(updatePortfolioCategoryInput.id, updatePortfolioCategoryInput);
  // }

  // @Mutation(() => PortfolioCategory)
  // removePortfolioCategory(@Args('id', { type: () => Int }) id: number) {
  //   return this.portfolioCategoryService.remove(id);
  // }
}
