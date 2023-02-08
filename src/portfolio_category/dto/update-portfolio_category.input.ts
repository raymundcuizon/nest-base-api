import { CreatePortfolioCategoryInput } from './create-portfolio_category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePortfolioCategoryInput extends PartialType(CreatePortfolioCategoryInput) {
  @Field(() => Int)
  id: number;
}
