import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UploadFileService } from './upload-file.service';
// import { UploadFile } from './entities/upload-file.entity';
// import { CreateUploadFileInput } from './dto/create-upload-file.input';
// import { UpdateUploadFileInput } from './dto/update-upload-file.input';

import { S3PresignedURL } from './entities/s3PresignedUrl.entiry';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { GraphQLUpload, FileUpload } from "graphql-upload-minimal";
import { createWriteStream } from 'fs';

import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
import { S3ClientProvider } from '../aws/s3-clients.provider'
import { UploadFile } from './entities/upload-file.entity';
import { Body } from '@nestjs/common';

@Resolver()
export class UploadFileResolver {
  constructor(private readonly uploadFileService: UploadFileService, private readonly s3ClientProvider: S3ClientProvider,
    ) {}

  // @Mutation(() => UploadFile)
  // createUploadFile(@Args('createUploadFileInput') createUploadFileInput: CreateUploadFileInput) {
  //   return this.uploadFileService.create(createUploadFileInput);
  // }

  // @Query(() => [UploadFile], { name: 'uploadFile' })
  // findAll() {
  //   return this.uploadFileService.findAll();
  // }

  @Query(() => S3PresignedURL, { name: 'S3PresignedURLPutCommand' })
  s3PresignedURL(@Args('fileType', { type: () => String }) fileType: string) {
    return this.uploadFileService.s3PresignedURL(fileType);
  }

  @Mutation(() => Boolean)
  async uploadFile(
    @Body() body,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<Boolean> {
    try {
      return this.uploadFileService.uploadImage(file)
    } catch(error) {
      console.log(error)
    }
    
  }

  // @Mutation(() => UploadFile)
  // updateUploadFile(@Args('updateUploadFileInput') updateUploadFileInput: UpdateUploadFileInput) {
  //   return this.uploadFileService.update(updateUploadFileInput.id, updateUploadFileInput);
  // }

  // @Mutation(() => UploadFile)
  // removeUploadFile(@Args('id', { type: () => Int }) id: number) {
  //   return this.uploadFileService.remove(id);
  // }
}

