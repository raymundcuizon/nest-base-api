import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioInput {
  @Field()
  image_name: string;

  @Field()
  portfolio_category_sk: string;
}
