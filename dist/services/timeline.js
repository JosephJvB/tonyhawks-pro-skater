"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class TimelineService {
    constructor(clients) {
        this.dynamo = clients.dynamo;
    }
    async saveUserHistory(eventData) {
        try {
            console.log('timelineService.saveUserHistory: invoked');
            const nextUser = new user_1.default(eventData);
            const dynamoRecord = await this.dynamo.tryGetUserHistory(nextUser.id);
            if (!dynamoRecord) {
                console.warn('No user record for ', nextUser.id, 'fallback to create');
                await this.dynamo.updateUserHistory([nextUser]);
                return true;
            }
            const userHistory = JSON.parse(dynamoRecord.history.S);
            userHistory.push(nextUser);
            await this.dynamo.updateUserHistory(userHistory);
            console.log('timelineService.saveUserHistory: success');
            return true;
        }
        catch (e) {
            console.error('timelineService.saveUserHistory: error');
            console.error(e);
            return false;
        }
    }
}
exports.default = TimelineService;
