"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
class TimelineService {
    constructor(clients) {
        this.dynamo = clients.dynamo;
        this.discord = clients.discord;
    }
    async handleScheduledEvent() {
        try {
            console.log('timelineService.handleScheduledEvent: invoked');
            const list = await this.dynamo.getRegisteredUsers();
            for (const userId of list) {
                const [dynamoRecord, discordUser] = await Promise.all([
                    this.dynamo.tryGetUserHistory(userId),
                    this.discord.getUser(userId),
                ]);
                if (!dynamoRecord) {
                    console.warn('No user record for ', userId, 'fallback to create');
                    await this.dynamo.updateUserHistory(userId, [discordUser]);
                    return true;
                }
                const userHistory = JSON.parse(dynamoRecord.history.S);
                const latestUserData = new user_1.default(userHistory[userHistory.length - 1]);
                if (!latestUserData.hasChanged(discordUser)) {
                    console.log('No change for user', userId, 'exiting...');
                    return;
                }
                console.log('user has changed', userId, 'updating...');
                userHistory.push(discordUser);
                await this.dynamo.updateUserHistory(userId, userHistory);
            }
            console.log('timelineService.handleScheduledEvent: success');
            return true;
        }
        catch (e) {
            console.error('timelineService.handleScheduledEvent: error');
            console.error(e);
            return false;
        }
    }
}
exports.default = TimelineService;
