export default class User {
  id: string;
  nickname: string;
  avatar: string;
  timestamp: string;

  constructor(data: any) {
    const userData = data as User;
    this.id = userData.id;
    this.avatar = userData.avatar;
    this.timestamp = Date.now().toString();
  }
}