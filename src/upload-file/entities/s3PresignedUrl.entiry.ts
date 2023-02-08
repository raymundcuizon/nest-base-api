import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class S3PresignedURL {
  @Field()
  bucket_name: string;

  @Field()
  image_name: string;

  @Field()
  image_url: string;

  @Field()
  presigned_url: string;
}
