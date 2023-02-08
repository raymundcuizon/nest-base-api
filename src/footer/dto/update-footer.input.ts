import { CreateFooterInput } from './create-footer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFooterInput extends PartialType(CreateFooterInput) {
  @Field(() => Int)
  id: number;
}
