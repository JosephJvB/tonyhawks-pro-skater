import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from 'aws-lambda';

import Dynamo from "./clients/dynamo"
import TimelineService from "./services/timeline"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(process.env.DEBUG) {
    console.log('EVENT:', event.body)
  }
  const clients = {
    dynamo: new Dynamo(),
  };
  
  const service = new TimelineService(clients);
  const eventData = JSON.parse(event.body)
  const success = await service.saveUserHistory(eventData);
  
  return {
    statusCode: success ? 200 : 500,
  } as APIGatewayProxyResult;
}
