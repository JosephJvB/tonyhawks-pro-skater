import Dynamo from "../clients/dynamo";

interface DynamoString {
  S: string;
}
export interface UserHistory {
  id: DynamoString;
  history: DynamoString;
}
export interface Clients {
  dynamo?: Dynamo;
}