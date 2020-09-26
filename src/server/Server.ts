import { APIServer } from './APIServer';

const APIServerInstance = new APIServer();

export function getAPIServer(): APIServer {
    return APIServerInstance;
}
