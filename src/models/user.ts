export default class User {
  id: string;
  nickname: string;
  avatar: string;
  timestamp: string;

  constructor(userData: User) {
    this.id = userData.id;
    this.avatar = userData.avatar;
    this.nickname = userData.nickname;
    this.timestamp = Date.now().toString();
  }
}