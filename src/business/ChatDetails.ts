import { Message } from "./Message.js";

export class ChatDetails {

    public user_id: string;
    public display_name: string;
    public avatar: string;
    public messages: Message[];
    public message_count: number;

    constructor(json) {
        this.user_id = json.user_id;
        this.display_name = json.display_name;
        this.avatar = json.avatar;
        this.messages = [];
        json.messages.forEach(object => {
            let message = new Message(object);
            this.messages.push(message);
        });
        this.message_count = this.messages.length;
    }
}

let fakeChatDetailsJson = `
{
    "user_id": "123",
    "display_name": "Vasya",
    "avatar": "https://picsum.photos/100",
    "messages": [{
        "incoming": true,
        "text": "Hi this is message 1 from Vasya!",
        "url": "",
        "timestamp": 1327611110417,
        "datetime_text": "8:20 am"
    },
    {
        "incoming": false,
        "text": "",
        "url": "https://picsum.photos/300",
        "timestamp": 1327611110417,
        "datetime_text": "8:20 am"
    },
    {
        "incoming": true,
        "text": "Hi this is message 2 from Vasya!",
        "url": "",
        "timestamp": 1327611110417,
        "datetime_text": "8:30 am"
    }]
}
`;

export let fakeChatDetails = new ChatDetails(JSON.parse(fakeChatDetailsJson));