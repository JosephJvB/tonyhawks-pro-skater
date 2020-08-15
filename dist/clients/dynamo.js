"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
var DynamoMethods;
(function (DynamoMethods) {
    DynamoMethods["putItem"] = "putItem";
    DynamoMethods["getItem"] = "getItem";
})(DynamoMethods || (DynamoMethods = {}));
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
                Key: { id: { S: userId.toString() } },
                TableName: this.tableName
            };
            const data = await this.lesshgoo(DynamoMethods.getItem, params);
            return data === null || data === void 0 ? void 0 : data.Item;
        }
        catch (e) {
            return null;
        }
    }
    updateUserHistory(nextHistory) {
        const params = {
            Item: {
                id: { S: nextHistory[0].id.toString() },
                history: { S: JSON.stringify(nextHistory) }
            },
            TableName: this.tableName
        };
        return this.lesshgoo(DynamoMethods.putItem, params);
    }
    lesshgoo(method, params) {
        if (process.env.DEBUG) {
            console.log(`Dynamo.${method}:`);
            console.log(JSON.stringify(params, null, 2));
        }
        return this.client[method](params).promise();
    }
}
exports.default = Dynamo;
