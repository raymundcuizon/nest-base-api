import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterUser {

  @Field()
  msg: string
  
}