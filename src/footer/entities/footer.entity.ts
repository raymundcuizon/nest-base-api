import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Footer {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
