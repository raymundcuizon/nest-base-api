import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SocialMedia {

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
