import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAboutMeInput {
  @Field()
  logo: string;
  
  @Field()
  feature_image: string;

  @Field()
  short_details: string;

  @Field()
  description: string;
  
  @Field()
  in_my_bag: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  contact: string;

  // @Field(() => String, { nullable: true })
  // coverPhoto?: string;

  // private _coverPhoto?: Buffer;

}
