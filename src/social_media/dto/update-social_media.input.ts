import { CreateSocialMediaInput } from './create-social_media.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSocialMediaInput extends PartialType(CreateSocialMediaInput) {

  @Field()
  pk: string;

  @Field()
  sk: string;

  @Field()
  social_icon: string;

  @Field()
  social_name: string;

  @Field()
  social_link: string;
}
