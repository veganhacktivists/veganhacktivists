import {
  DynamoDBClient,
  BatchExecuteStatementCommand,
} from '@aws-sdk/client-dynamodb';
import AWS, { Credentials, DynamoDB } from 'aws-sdk';
import type { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: 'east',
    endpoint: `${process.env.DYNAMODB_HOST}:${process.env.DYNAMODB_PORT}`,
  },
  true
);

const dynamodb = new AWS.DynamoDB.DocumentClient();

export default dynamodb;
