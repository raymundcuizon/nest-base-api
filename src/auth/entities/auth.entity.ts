import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()

export class Auth {
    
    @Field()
    username:string
    @Field()
    email:string
}