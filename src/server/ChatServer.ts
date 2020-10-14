import { APIServer, HTTPResponse } from "./APIServer";

export class ChatServer extends APIServer {

    chats(): Promise<HTTPResponse> {
        return this.get("/chats");
    }

    createChat(title: string): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        return this.post("/chats", { data: { title: title }, headers: headers });
    }

    chatUsers(chatId: string): Promise<HTTPResponse> {
        return this.get("/chats/" + chatId + "/users");
    }

    addUsers(users: string[], chatId: string): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        return this.put("/chats/users", { data: { users: users, chatId: chatId }, headers: headers });
    }

    deleteUsers(users: string[], chatId: string): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        return this.delete("/chats/users", { data: { users: users, chatId: chatId }, headers: headers });
    }
}
