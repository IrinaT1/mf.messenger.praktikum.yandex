import { APIServer } from './APIServer';
import { AuthServer } from './AuthServer';

const ApiServerUrl = "https://ya-praktikum.tech/api/v2";

export function getAuthServer(): AuthServer {
    return new AuthServer(ApiServerUrl);
}

export function getAPIServer(): APIServer {
    return new APIServer(ApiServerUrl);
}
