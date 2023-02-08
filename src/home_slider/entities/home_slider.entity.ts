import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HomeSlider {
  
  @Field()
  pk: string;

  @Field()
  sk: string;

  @Field()
  blurhash: string;

  @Field()
  display: string;

  @Field()
  image_url: string;
  
  @Field()
  image_name: string;

}
