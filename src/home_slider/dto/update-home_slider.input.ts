import { CreateHomeSliderInput } from './create-home_slider.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHomeSliderInput extends PartialType(CreateHomeSliderInput) {
  @Field(() => Int)
  id: number;
}
