"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamo_1 = require("./clients/dynamo");
const timeline_1 = require("./services/timeline");
exports.handler = async (event) => {
    if (process.env.DEBUG) {
        console.log('EVENT:', event.body);
    }
    const clients = {
        dynamo: new dynamo_1.default(),
    };
    const service = new timeline_1.default(clients);
    const eventData = JSON.parse(event.body);
    const success = await service.saveUserHistory(eventData);
    return {
        statusCode: success ? 200 : 500,
    };
};
