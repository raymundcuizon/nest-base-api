import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CONST_DB } from 'src/constant/dynamoDBCOnstant';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';
import { CreatePortfolioInput } from './dto/create-portfolio.input';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {

  constructor(
    private readonly dbClientsProvider: DbClientsProvider
  ) {}

  async create(createPortfolioInput: CreatePortfolioInput): Promise<Portfolio> {
    const timestamp = Date.now();

    const portfolio = {
      pk: `${CONST_DB.PORTFOLIO.PK}#${createPortfolioInput.portfolio_category_sk}`,
      sk: timestamp.toString(),
      image_name: createPortfolioInput.image_name
    }
    
    try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        Item: portfolio,
      }
      await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
      return portfolio

    } catch(error){
      throw new InternalServerErrorException(error);
    }

  }

  public async getAllPortfolioBySk(
    sk: string,
  ): Promise<any[]> {
      try {
      const params = {
        TableName: CONST_DB.TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {':pk': `${CONST_DB.PORTFOLIO.PK}#${sk}`},
      }
      const result = await this.dbClientsProvider.dbDocumentClient.send(new QueryCommand(params));
      return result.Items
    } catch(error) {
      throw new InternalServerErrorException(error)
    }
  }

  findAll() {
    return `This action returns all portfolio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioInput: UpdatePortfolioInput) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
