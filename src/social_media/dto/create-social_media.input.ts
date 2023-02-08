import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSocialMediaInput {
  @Field()
  social_icon: string;

  @Field()
  social_name: string;

  @Field()
  social_link: string;
}
