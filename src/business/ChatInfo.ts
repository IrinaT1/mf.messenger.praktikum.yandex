import { ChatDetails } from './ChatDetails';
import { fakeChatDetails1, fakeChatDetails2 } from './ChatDetails.mock'
import { Message } from './Message';

export class ChatInfo {

    public id: string;
    public display_name: string;
    public avatar: string;
    public last_message: Message;

    constructor(json) {
        this.id = json.id;
        this.display_name = json.display_name;
        this.avatar = json.avatar;
        this.last_message = new Message(json.last_message);
    }

    details(): Promise<ChatDetails> {
        return new Promise((resolve) => {
            console.log("Chat details() not yet implemented, returning fake data");
            if (this.display_name === "Vasya") {
                resolve(fakeChatDetails1);
            } else {
                resolve(fakeChatDetails2);
            }
        });
    }
}
