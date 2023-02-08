import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSocialMediaInput } from './dto/create-social_media.input';
import { UpdateSocialMediaInput } from './dto/update-social_media.input';
import { DbClientsProvider } from "../dynamoDB/db-clients.provider";
import { CONST_DB } from '../constant/dynamoDBCOnstant';
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class SocialMediaService {

  constructor(private readonly dbClientsProvider: DbClientsProvider ) { }
  async create(createSocialMediaInput: CreateSocialMediaInput) {

    const timestamp = Date.now();
    const social = {
      pk: CONST_DB.SOCIAL_MEDIA.PK,
      sk: timestamp.toString(),
      ...createSocialMediaInput
    }

    try {

      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Item: social,
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
      console.log(result)
      return social

      } catch(error){
        console.log(error)
        throw new InternalServerErrorException(error);
      }
  }

  async findAll() {
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {':pk': CONST_DB.SOCIAL_MEDIA.PK},
       
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new QueryCommand(params));

      return result.Items

    } catch(error) {
      throw new InternalServerErrorException(error)
    }  }

  findOne(id: number) {
    return `This action returns a #${id} socialMedia`;
  }

  async update(updateSocialMediaInput: UpdateSocialMediaInput) {
    const timestamp = Date.now();
    const social = {...updateSocialMediaInput }

    try {

      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Item: social,
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
      return social

      } catch(error){
        console.log(error)
        throw new InternalServerErrorException(error);
      }
  }

  async remove( pk: string, sk: string) {
    const params = {
      TableName: CONST_DB.TABLE_NAME,
      Key: {
        pk, sk
      },
    };
      try {
        const data = await this.dbClientsProvider.dbDocumentClient.send(new DeleteCommand(params));
        return { pk, sk }
      } catch (err) {
        console.log(err)
        throw new InternalServerErrorException(err);
      }
  }
}
