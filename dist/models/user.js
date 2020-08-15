"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(data) {
        const userData = data;
        this.id = userData.id;
        this.avatar = userData.avatar;
        this.timestamp = Date.now().toString();
    }
}
exports.default = User;
