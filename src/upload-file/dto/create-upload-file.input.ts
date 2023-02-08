import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUploadFileInput {
  @Field(() => String, { nullable: true })
  coverPhoto?: string;

  private _coverPhoto?: Buffer;
  
}
