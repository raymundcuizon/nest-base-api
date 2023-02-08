import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHomeSliderInput {
  @Field(() => String, { description: 'Image name for home slider (uuid.png)' })
  imgName: string;
}
