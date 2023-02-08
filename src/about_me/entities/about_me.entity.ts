import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AboutMe {
  @Field()
  logo: string;
  
  @Field()
  feature_image: string;

  @Field()
  short_details: string;

  @Field()
  description: string;
  
  @Field()
  in_my_bag: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  contact: string;
}
