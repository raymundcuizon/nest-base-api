import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CONST_DB } from 'src/constant/dynamoDBCOnstant';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';
import { CreatePortfolioCategoryInput } from './dto/create-portfolio_category.input';
import { UpdatePortfolioCategoryInput } from './dto/update-portfolio_category.input';
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";


@Injectable()
export class PortfolioCategoryService {

  constructor(
    private readonly dbClientsProvider: DbClientsProvider
  ) {}

  async create(createPortfolioCategoryInput: CreatePortfolioCategoryInput) {
    const timestamp = Date.now();

    const portfolio_category = {
      pk: CONST_DB.PORTFOLIO_CATEGORY.PK,
      sk: timestamp.toString(),
      isActive: true,
      ...createPortfolioCategoryInput
    }
    
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Item: portfolio_category,
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
      
      return params.Item
      
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
        ExpressionAttributeValues: {':pk': CONST_DB.PORTFOLIO_CATEGORY.PK},
       
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new QueryCommand(params));

      return result.Items

    } catch(error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(sk: string) {
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Key:{
          pk: CONST_DB.PORTFOLIO_CATEGORY.PK,
          sk
        }
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new GetCommand(params));

      if(!result.Item)
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'no food available',
        }, HttpStatus.NOT_FOUND);

      return result.Item;
    } catch(error) {
      // this.logger.error(error.message);
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  update(id: number, updatePortfolioCategoryInput: UpdatePortfolioCategoryInput) {
    return `This action updates a #${id} portfolioCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolioCategory`;
  }
}
