// src/s3/s3.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { awsConfig } from '../files-manager/aws.config';

@Injectable()
export class FilesManagerService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,      
    };
    
    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location;
  }

  async downloadFile(fileKey: string): Promise<AWS.S3.GetObjectOutput> {
    try {
      const params = {
        Bucket: awsConfig.bucketName,
        Key: fileKey,
      };

      return await this.s3.getObject(params).promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
