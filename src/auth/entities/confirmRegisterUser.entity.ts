import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmRegisterUser {

  @Field()
  msg: string
  
}