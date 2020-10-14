import { APIServer } from './APIServer';
import { AuthServer } from './AuthServer';
import { ChatServer } from './ChatServer';

const ApiServerUrl = "https://ya-praktikum.tech/api/v2";

const AuthServerInstance = new AuthServer(ApiServerUrl);
const ChatServerInstance = new ChatServer(ApiServerUrl);

export function getAuthServer(): AuthServer {
    return AuthServerInstance;
}

export function getChatServer(): ChatServer {
    return ChatServerInstance;
}

export function getAPIServer(): APIServer {
    return new APIServer(ApiServerUrl);
}
