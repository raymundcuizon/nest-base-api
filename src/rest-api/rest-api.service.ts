import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3ClientProvider } from 'src/aws/s3-clients.provider';
import { DbClientsProvider } from 'src/dynamoDB/db-clients.provider';
import { CreateRestApiDto } from './dto/create-rest-api.dto';
import { UpdateRestApiDto } from './dto/update-rest-api.dto';
import { UploadImageCategory } from './dto/upload-image-category.dto';
import { extname } from 'path';
import { encodeBlurHash, getFileExtension } from 'src/Utils';
import { v4 as uuid } from 'uuid';
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { CONST_DB } from 'src/constant/dynamoDBCOnstant';
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, UpdateCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";


@Injectable()
export class RestApiService {

  constructor(
    private readonly s3ClientProvider: S3ClientProvider,
    private readonly dbClientsProvider: DbClientsProvider) {
  }

  async uploadCategoryPortfolioImage(uploadImageCategory: UploadImageCategory, file: Express.Multer.File) {
    try {

      const fileExtension = extname(file.originalname)
      const image_name = `${uuid()}${fileExtension}`
      const blurhash = await encodeBlurHash(file.buffer)
      const folder = `portfolio/${uploadImageCategory.category_slug}`

      const bucket_name = process.env.AWS_S3_BUCKET_NAME
      const region = process.env.AWS_REGION
      const uploadParams = {
        Bucket:bucket_name,
        Key:`${folder}/${image_name}`,
        Body:file.buffer,
        ContentType: file.mimetype,
      };

      await this.s3ClientProvider.s3Client.send(new PutObjectCommand(uploadParams))
      const image_url = `https://${bucket_name}.s3.${region}.amazonaws.com/${folder}/${image_name}`

      const timestamp = Date.now();

      const portfolioImage = {
          pk: `${CONST_DB.PORTFOLIO.PK}#${uploadImageCategory.category_sk}`,
          sk: timestamp.toString(),
          blurhash,
          image_name,
          image_url,
          display: true
        }
      

        const params = {
          TableName: CONST_DB.TABLE_NAME,
          Item: portfolioImage,
        }
        await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
        
        return portfolioImage

    } catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async uploadImageSlider(uploadImageCategory: UploadImageCategory, file: Express.Multer.File){
    
    try {

      const fileExtension = extname(file.originalname)
      const image_name = `${uuid()}${fileExtension}`
      const blurhash = await encodeBlurHash(file.buffer)
      const folder = `home-slider`

      const bucket_name = process.env.AWS_S3_BUCKET_NAME
      const region = process.env.AWS_REGION
      const uploadParams = {
        Bucket:bucket_name,
        Key:`${folder}/${image_name}`,
        Body:file.buffer,
        ContentType: file.mimetype,
      };

      await this.s3ClientProvider.s3Client.send(new PutObjectCommand(uploadParams))
      const image_url = `https://${bucket_name}.s3.${region}.amazonaws.com/${folder}/${image_name}`

      const timestamp = Date.now();

      const homeSlider = {
        
          pk: CONST_DB.HOME_SLIDER.PK,
          sk: timestamp.toString(),
          blurhash,
          image_name,
          image_url,
          display: true
        }
      
        const params = {
          TableName: CONST_DB.TABLE_NAME,
          Item: homeSlider,
        }
        await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));
        
        return homeSlider
    } catch(error){
      console.log(error)
      throw new InternalServerErrorException(error);
    }

  }
  create(createRestApiDto: CreateRestApiDto) {
    return 'This action adds a new restApi';
  }

  findAll() {
    return `This action returns all restApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restApi`;
  }

  update(id: number, updateRestApiDto: UpdateRestApiDto) {
    return `This action updates a #${id} restApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} restApi`;
  }
}
