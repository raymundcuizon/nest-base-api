import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterDTO {
    @Field()
    name: string
    @Field()
    preferred_username: string
    @Field()
    gender: string
    @Field()
    birthdate: string
    @Field()
    address: string
    @Field()
    email:string
    @Field()
    phone_number: string
    @Field()
    scope:string
    @Field()
    username:string
    @Field()
    password:string
}