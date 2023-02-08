import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAboutMeInput } from './dto/create-about_me.input';
import { UpdateAboutMeInput } from './dto/update-about_me.input';
import { DbClientsProvider } from "../dynamoDB/db-clients.provider";
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { CONST_DB } from 'src/constant/dynamoDBCOnstant';
import { AboutMe } from './entities/about_me.entity';

@Injectable()
export class AboutMeService {

  constructor(private readonly dbClientsProvider: DbClientsProvider) {}

  async create(createAboutMeInput: CreateAboutMeInput): Promise<AboutMe> {

    const aboutMe = {
        pk: CONST_DB.ABOUT_ME.PK,
        sk: CONST_DB.ABOUT_ME.PK,
        ...createAboutMeInput
    }

    try {

      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Item: aboutMe,
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
      console.log(result)
      return aboutMe

      } catch(error){
        console.log(error)
        throw new InternalServerErrorException(error);
      }
  }

  findAll() {
    return `This action returns all aboutMe`;
  }

  async getAboutMe() {
   try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Key:{
          pk: CONST_DB.ABOUT_ME.PK,
          sk: CONST_DB.ABOUT_ME.PK
        }
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new GetCommand(params));

      if(!result.Item)
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'not available',
        }, HttpStatus.NOT_FOUND);

      return result.Item;
    } catch(error) {
      // this.logger.error(error.message);
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  update(id: number, updateAboutMeInput: UpdateAboutMeInput) {
    return `This action updates a #${id} aboutMe`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutMe`;
  }
}
