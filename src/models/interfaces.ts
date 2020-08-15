import Discord from "../clients/discord";
import Dynamo from "../clients/dynamo";

interface DynamoString {
  S: string;
}
export interface UserHistory {
  id: DynamoString;
  history: DynamoString;
}
export interface Clients {
  discord?: Discord;
  dynamo?: Dynamo;
}