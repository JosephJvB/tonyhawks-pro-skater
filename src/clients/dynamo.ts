import { DynamoDB } from 'aws-sdk';
import { UserHistory } from '../models/interfaces';
import User from '../models/user';

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
        Key: { id: { S: userId } }
      };
      const data = await this.getDocument(params);
      return data?.Item;
    } catch (e) {
      return null;
    }
  }
  async getRegisteredUsers(): Promise<string[]> {
    const params = {
      Key: { id: { S: '__userList__' }}
    };
    const data = await this.getDocument(params);
    return data?.Item?.history
      ? JSON.parse(data.Item.history.S)
      : []
  }
  updateUserHistory(userId: string, history: User[]) {
    const params = {
      Item: {
        id: { S: userId },
        history: { S: JSON.stringify(history) }
      }
    }
    return this.writeDocument(params);
  }

  getDocument(params: any): Promise<any> {
    params.TableName = this.tableName;
    params.ConsistentRead = true;
    if(process.env.DEBUG) {
      console.log('Dynamo.getDocument:');
      console.log(JSON.stringify(params, null, 2));
    }
    return this.client.getItem(params).promise();
  }
  writeDocument(params: any): Promise<any> {
    params.TableName = this.tableName;
    if(process.env.DEBUG) {
      console.log('Dynamo.writeDocument:');
      console.log(JSON.stringify(params, null, 2));
    }
    return this.client.putItem(params).promise();
  }
}