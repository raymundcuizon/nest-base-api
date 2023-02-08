import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

@ObjectType()
export class PortfolioCategory {
  @Field()
  pk: string;

  @Field()
  sk: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field({ defaultValue: true })
  isActive: boolean

  @Field(() => [Portfolio])
  portfolios?: Portfolio[];
}
