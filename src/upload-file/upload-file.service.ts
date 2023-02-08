import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUploadFileInput } from './dto/create-upload-file.input';
import { UpdateUploadFileInput } from './dto/update-upload-file.input';

import { v4 as uuid } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
import { S3ClientProvider } from '../aws/s3-clients.provider'
import { CONST_DB } from '../constant/dynamoDBCOnstant';
import { DbClientsProvider } from '../dynamoDB/db-clients.provider';
import { S3PresignedURL as S3PresignedURLRes } from './entities/s3PresignedUrl.entiry';
import { encodeBlurHash, createBuffer, getFileExtension } from "../Utils/index"
import { FileUpload } from 'graphql-upload-minimal';
import { UploadFile } from './entities/upload-file.entity';

@Injectable()
export class UploadFileService {

  constructor(
    private readonly s3ClientProvider: S3ClientProvider,
    private readonly dbClientsProvider: DbClientsProvider
  ) {

  }

  create(createUploadFileInput: CreateUploadFileInput) {
    return 'This action adds a new uploadFile';
  }

  findAll() {
    return `This action returns all uploadFile`;
  }

  async uploadImage(file: FileUpload): Promise<Boolean> {

    try {
      const { createReadStream, filename, mimetype} = await file;
      const buffer = await createBuffer(createReadStream)
      const blurhash = await encodeBlurHash(buffer)

      const fileExtension = getFileExtension(filename)
      const image_name = `${uuid()}.${fileExtension}`
      const bucket_name = process.env.AWS_S3_BUCKET_NAME
      const region = process.env.AWS_REGION
      const uploadParams = {
        Bucket:bucket_name,
        Key:image_name,
        Body:buffer,
        ContentType: mimetype,
      };
      await this.s3ClientProvider.s3Client.send(new PutObjectCommand(uploadParams))
      const image_url = `https://${bucket_name}.s3.${region}.amazonaws.com/${image_name}`
      // const result =  {
      //   blurhash,
      //   image_url,
      //   success: true
      // }
      // console.log(result)
      return true
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async s3PresignedURL(fileType: string): Promise<S3PresignedURLRes> {

    try {
      const s3 = this.s3ClientProvider.s3Client;
      const image_name = `${uuid()}.${fileType}`
      const bucket_name = process.env.AWS_S3_BUCKET_NAME
      const region = process.env.AWS_REGION
      const command = new PutObjectCommand({
        Bucket: bucket_name,
        Key: image_name,
      });
      const presigned_url = await getSignedUrl(s3, command, { expiresIn: 120 }); // expires in seconds
      const image_url = `https://${bucket_name}.s3.${region}.amazonaws.com/${image_name}`
      return { 
        bucket_name,
        image_name,
        image_url,
        presigned_url
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    
  }

  update(id: number, updateUploadFileInput: UpdateUploadFileInput) {
    return `This action updates a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
