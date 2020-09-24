import { APIServer } from './APIServer.js';

const APIServerInstance = new APIServer();

export function getAPIServer(): APIServer {
    return APIServerInstance;
}
