import { ChatDetails, fakeChatDetails1, fakeChatDetails2 } from './ChatDetails';
import { Message } from './Message';

export class ChatInfo {

    public user_id: string;
    public display_name: string;
    public avatar: string;
    public last_message: Message;

    constructor(json) {
        this.user_id = json.user_id;
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

let fakeChatInfoJson = `
{
    "user_id": "123",
    "display_name": "Vasya",
    "login": "vasya123",
    "avatar": "https://picsum.photos/100",
    "last_message": {
        "incoming": true,
        "text": "Hi this is last message from Vasya!",
        "url": "",
        "timestamp": 1327611110417,
        "datetime_text": "8:30 am"
    }
}
`;