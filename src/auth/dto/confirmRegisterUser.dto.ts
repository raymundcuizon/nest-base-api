import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ConfirmRegisterUserDTO {
    @Field()
    username: string
    @Field()
    code: string
}