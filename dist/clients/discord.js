"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const user_1 = require("../models/user");
class Discord {
    constructor() {
        this.baseUrl = 'https://discordapp.com/api';
        this.authHeaders = { Authorization: '' };
        this.guildId = '330849933613596672';
        this.authHeaders.Authorization = 'Bot ' + process.env.BotToken;
    }
    async getUser(userId) {
        const response = await axios_1.default({
            url: `${this.baseUrl}/guilds/${this.guildId}/members/${userId}`,
            headers: this.authHeaders
        });
        const data = response.data;
        return new user_1.default({
            id: data.user.id,
            nickname: data.nick,
            avatar: data.user.avatar
        });
    }
}
exports.default = Discord;
