import { DynamoDB } from 'aws-sdk';
import { UserHistory } from '../models/interfaces';
import User from '../models/user';

enum DynamoMethods {
  putItem = 'putItem',
  getItem = 'getItem',
}

export default class Dynamo {
  client: DynamoDB;
  tableName = 'Users';
  constructor() {
    this.client = new DynamoDB({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AccessKey,
      secretAccessKey: process.env.SecretKey
    })
  }

  async tryGetUserHistory(userId: string): Promise<UserHistory> {
    try {
      const params = {
        Key: { id: { S: userId.toString() } },
        TableName: this.tableName
      };
      const data = await this.lesshgoo(
        DynamoMethods.getItem,
        params
      );
      return data?.Item;
    } catch (e) {
      return null;
    }
  }
  updateUserHistory(nextHistory: User[]) {
    const params = {
      Item: {
        id: { S: nextHistory[0].id.toString() },
        history: { S: JSON.stringify(nextHistory) }
      },
      TableName: this.tableName
    }
    return this.lesshgoo(
      DynamoMethods.putItem,
      params
    );
  }
  lesshgoo(method: DynamoMethods, params: any): Promise<any> {
    if(process.env.DEBUG) {
      console.log(`Dynamo.${method}:`);
      console.log(JSON.stringify(params, null, 2));
    }
    return (this.client[method] as Function)(params).promise();
  }
}