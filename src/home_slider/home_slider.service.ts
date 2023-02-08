import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateHomeSliderInput } from './dto/create-home_slider.input';
import { UpdateHomeSliderInput } from './dto/update-home_slider.input';
import { HomeSliderS3Presigned } from './entities/home_slider_s3_presigned.entity';
import { v4 as uuid } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand, DeleteObjectCommand  } from "@aws-sdk/client-s3";
import { S3ClientProvider } from '../aws/s3-clients.provider'
import { CONST_DB } from '../constant/dynamoDBCOnstant';
import { DbClientsProvider } from '../dynamoDB/db-clients.provider';
import { UpdateHomeSliderVisibilityInput } from './dto/update-home_slider-visibility.input';
import { generateUpdateQuery } from 'src/Utils';

@Injectable()
export class HomeSliderService {

  constructor(
      private readonly s3ClientProvider: S3ClientProvider,
      private readonly dbClientsProvider: DbClientsProvider
    ) {}
  
  async create(createHomeSliderInput: CreateHomeSliderInput) {
    const timestamp = Date.now();

    const homeSlider = {
      pk: CONST_DB.HOME_SLIDER.PK,
      sk: timestamp.toString(),
      ...createHomeSliderInput
    }
    
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Item: homeSlider,
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
      
      return { imgName: createHomeSliderInput.imgName }
    } catch(error){
      
      throw new InternalServerErrorException(error);
    }
    
  }

  async findAll() {
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {':pk': CONST_DB.HOME_SLIDER.PK},
       
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new QueryCommand(params));
      return result.Items

    } catch(error) {
      
    }
  }

  async findOne(pk: string, sk: string) {
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Key:{
          pk,
          sk
        }
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new GetCommand(params));

      if(!result.Item)
        throw new HttpException("message", 400, { cause: new Error("No data available") })

      return result.Item;
    } catch(error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(updateHomeSliderVisibilityInput: UpdateHomeSliderVisibilityInput): Promise<Boolean> {

    try {
      // For validation | make sure it is exist in database
      const sk = updateHomeSliderVisibilityInput.sk;
      const pk = CONST_DB.HOME_SLIDER.PK;
      await this.findOne(pk, sk)

      delete updateHomeSliderVisibilityInput.sk;
      const expression = generateUpdateQuery(updateHomeSliderVisibilityInput);

      let params = {
        TableName: CONST_DB.TABLE_NAME,
        Key:{
          pk,
          sk
        },
        ReturnValues: 'ALL_NEW',
        ...expression
      }
      await  this.dbClientsProvider.dbDocumentClient.send(new UpdateCommand(params))
      return true
    } catch(error) {
      throw new InternalServerErrorException(error)
    }
    
  }

  async remove(sk: string): Promise<Boolean> {
    
    try {
      const pk = CONST_DB.HOME_SLIDER.PK;
      const image = await this.findOne(pk, sk)
      const folder = `home-slider`
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Key: { pk, sk },
      };
      await this.dbClientsProvider.dbDocumentClient.send(new DeleteCommand(params));

      const bucket_name = process.env.AWS_S3_BUCKET_NAME
      const deleteObjectsCommand = new DeleteObjectCommand({
        Bucket: bucket_name,
        Key: `${folder}/${image.image_name}`
      });

      await this.s3ClientProvider.s3Client.send(deleteObjectsCommand);
      
      return true

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async generateAwsPreSignedURL(fileType: string): Promise<HomeSliderS3Presigned> {
    const s3 = this.s3ClientProvider.s3Client;
    const image_name = `${uuid()}.jpeg`
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: image_name
    });
    const presigned_url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // expires in seconds
    const url = `https://raymund-photography.s3.ap-southeast-1.amazonaws.com/${image_name}`
    return { presigned_url, image_name: url }
  }
}
