import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class DeleteHomeSliderInput {
    @Field()
    sk: string;
}
