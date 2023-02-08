import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateHomeSliderVisibilityInput {
    @Field()
    display: string;

    @Field()
    sk: string;
    
}
