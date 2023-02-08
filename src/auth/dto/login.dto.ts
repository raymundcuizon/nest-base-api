import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginDTO {

    @Field()
    username:string

    @Field()
    password:string

}