import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioCategoryInput {
  @Field()
  name: string;

  @Field()
  slug: string;
}
