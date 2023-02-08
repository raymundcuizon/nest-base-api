import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HomeSliderS3Presigned {
  @Field(() => String)
  presigned_url: string;

  @Field(() => String)
  image_name: string;
}
