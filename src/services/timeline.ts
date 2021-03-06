import Dynamo from "../clients/dynamo";
import { Clients } from "../models/interfaces";
import User from '../models/user';

export default class TimelineService {
  dynamo: Dynamo;

  constructor(clients: Clients) {
    this.dynamo = clients.dynamo;
  }

  async saveUserHistory(eventData: { user: User }): Promise<boolean> {
    try {
      console.log('timelineService.saveUserHistory: invoked');
      const nextUser = new User(eventData.user);
      const dynamoRecord = await this.dynamo.tryGetUserHistory(nextUser.id);
      const userHistory = dynamoRecord 
       ? JSON.parse(dynamoRecord.history.S)
       : [];
      userHistory.push(nextUser);
      await this.dynamo.updateUserHistory(userHistory);
      console.log('timelineService.saveUserHistory: success');
      return true;
    } catch (e) {
      console.error('timelineService.saveUserHistory: error');
      console.error(e);
      return false;
    }
  }
}