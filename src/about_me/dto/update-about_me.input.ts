import { CreateAboutMeInput } from './create-about_me.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAboutMeInput extends PartialType(CreateAboutMeInput) {
  @Field(() => Int)
  id: number;
}
