"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
class Dynamo {
    constructor() {
        this.tableName = 'Users';
        this.client = new aws_sdk_1.DynamoDB({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AccessKey,
            secretAccessKey: process.env.SecretKey
        });
    }
    async tryGetUserHistory(userId) {
        try {
            const params = {
                Key: { id: { S: userId } }
            };
            const data = await this.getDocument(params);
            return data === null || data === void 0 ? void 0 : data.Item;
        }
        catch (e) {
            return null;
        }
    }
    async getRegisteredUsers() {
        var _a;
        const params = {
            Key: { id: { S: '__userList__' } }
        };
        const data = await this.getDocument(params);
        return ((_a = data === null || data === void 0 ? void 0 : data.Item) === null || _a === void 0 ? void 0 : _a.history) ? JSON.parse(data.Item.history.S)
            : [];
    }
    updateUserHistory(userId, history) {
        const params = {
            Item: {
                id: { S: userId },
                history: { S: JSON.stringify(history) }
            }
        };
        return this.writeDocument(params);
    }
    getDocument(params) {
        params.TableName = this.tableName;
        params.ConsistentRead = true;
        if (process.env.DEBUG) {
            console.log('Dynamo.getDocument:');
            console.log(JSON.stringify(params, null, 2));
        }
        return this.client.getItem(params).promise();
    }
    writeDocument(params) {
        params.TableName = this.tableName;
        if (process.env.DEBUG) {
            console.log('Dynamo.writeDocument:');
            console.log(JSON.stringify(params, null, 2));
        }
        return this.client.putItem(params).promise();
    }
}
exports.default = Dynamo;
