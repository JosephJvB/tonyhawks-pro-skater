import axios from 'axios';
import User from '../models/user';

interface DiscordUserResponse {
  user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
  },
  nick: string;
}

export default class Discord {
  baseUrl = 'https://discordapp.com/api';
  authHeaders = { Authorization: '' };
  guildId = '330849933613596672';

  constructor() {
    this.authHeaders.Authorization = 'Bot ' + process.env.BotToken
  }

  async getUser(userId: string): Promise<User> {
    const response = await axios({
      url: `${this.baseUrl}/guilds/${this.guildId}/members/${userId}`,
      headers: this.authHeaders
    })
    const data = response.data as DiscordUserResponse;
    return new User({
      id: data.user.id,
      nickname: data.nick,
      avatar: data.user.avatar
    } as User);
  }
}