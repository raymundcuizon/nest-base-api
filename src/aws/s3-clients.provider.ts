import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand  } from "@aws-sdk/client-s3";
import { v4 as uuid } from 'uuid';
import { Injectable } from "@nestjs/common";


@Injectable()
export class S3ClientProvider {

    public s3Client: S3Client;

    constructor() {
        console.log('S3ClientProvider Init')
       const credentials = {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
        };
    
        const s3Configuration: S3ClientConfig = {
            credentials,
            region: process.env.AWS_REGION,
        };
    
        this.s3Client = new S3Client(s3Configuration);
    }
    // async generateAwsPreSignedURL() {

    //     const credentials = {
    //       accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    //       secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    //     };
    
    //     const s3Configuration: S3ClientConfig = {
    //         credentials,
    //         region: process.env.AWS_REGION,
    //     };
    
    //     const s3 = new S3Client(s3Configuration);
    
    //     // const command = new PutObjectCommand({Bucket:  process.env.AWS_S3_BUCKET_NAME!, Key: `${uuid()}.png` });
    //     // return await getSignedUrl(s3, command, { expiresIn: 3600 }); // expires in seconds

    //   }
}