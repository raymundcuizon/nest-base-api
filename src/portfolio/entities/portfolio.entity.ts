import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Portfolio {
  @Field()
  pk: string;

  @Field()
  sk: string;

  @Field()
  image_name: string;
  
}
