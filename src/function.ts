import Dynamo from "./clients/dynamo"
import Discord from "./clients/discord"
import TimelineService from "./services/timeline"

export const handler = async (): Promise<void> => {
  const clients = {
    dynamo: new Dynamo(),
    discord: new Discord(),
  }

  const service = new TimelineService(clients);
  await service.handleScheduledEvent();
  return;
}