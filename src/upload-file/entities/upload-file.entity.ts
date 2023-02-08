import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UploadFile {
  @Field()
  blurhash: string;

  @Field()
  image_url: string;

  @Field()
  success: boolean;

}
