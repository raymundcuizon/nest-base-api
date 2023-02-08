import { CreateUploadFileInput } from './create-upload-file.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUploadFileInput extends PartialType(CreateUploadFileInput) {
  @Field(() => Int)
  id: number;
}
