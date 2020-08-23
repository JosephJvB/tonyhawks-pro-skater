"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userData) {
        this.id = userData.id;
        this.avatar = userData.avatar;
        this.nickname = userData.nickname;
        this.timestamp = Date.now().toString();
    }
}
exports.default = User;
