import { ChatDetails } from './ChatDetails';

export type ChatInfoDataType = {
    id: string;
    title: string;
    avatar?: string;
}

export class ChatInfo {

    public data: ChatInfoDataType;

    constructor(data: ChatInfoDataType) {
        this.data = data;
    }

    json() {
        return this.data;
    }

    details(): Promise<ChatDetails> {
        return new Promise((resolve) => {
            console.log("Chat details() not yet implemented, returning fake data");
            // if (this.display_name === "Vasya") {
            //     resolve(fakeChatDetails1);
            // } else {
            //     resolve(fakeChatDetails2);
            // }
        });
    }
}
