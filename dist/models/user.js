"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(data) {
        this.id = data.id;
        this.nickname = data.nickname;
        this.avatar = data.avatar;
        this.timestamp = data.timestamp || Date.now().toString();
    }
    hasChanged(data) {
        const hasChanged = [
            this.nickname === data.nickname,
            this.avatar === data.avatar,
        ].includes(false);
        return hasChanged;
    }
}
exports.default = User;
