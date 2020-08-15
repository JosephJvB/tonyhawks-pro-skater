export default class User {
  id: string;
  nickname: string;
  avatar: string;
  timestamp: string;

  constructor(data?: User) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.avatar = data.avatar;
    this.timestamp = data.timestamp || Date.now().toString();
  }

  hasChanged(data: User): boolean {
    const hasChanged = [
      this.nickname === data.nickname,
      this.avatar === data.avatar,
    ].includes(false);
    return hasChanged;
  }
}