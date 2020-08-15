"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dynamo_1 = require("./clients/dynamo");
const discord_1 = require("./clients/discord");
const timeline_1 = require("./services/timeline");
exports.handler = async () => {
    const clients = {
        dynamo: new dynamo_1.default(),
        discord: new discord_1.default(),
    };
    const service = new timeline_1.default(clients);
    await service.handleScheduledEvent();
    return;
};
