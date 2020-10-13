import { APIServer } from './APIServer';
import { AuthServer } from './AuthServer';

const ApiServerUrl = "https://ya-praktikum.tech/api/v2";

const AuthServerInstance = new AuthServer(ApiServerUrl);

export function getAuthServer(): AuthServer {
    return AuthServerInstance;
}

export function getAPIServer(): APIServer {
    return new APIServer(ApiServerUrl);
}
