import { AuthServer } from './AuthServer';
import { ChatServer } from './ChatServer';
import { UserServer } from './UserServer';

export const ApiServerUrl = "https://ya-praktikum.tech/api/v2";

const AuthServerInstance = new AuthServer(ApiServerUrl);
const ChatServerInstance = new ChatServer(ApiServerUrl);
const UserServerInstance = new UserServer(ApiServerUrl);

export function getAuthServer(): AuthServer {
    return AuthServerInstance;
}

export function getChatServer(): ChatServer {
    return ChatServerInstance;
}

export function getUserServer(): UserServer {
    return UserServerInstance;
}
