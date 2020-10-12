import { Message } from './Message';

export class ChatDetails {

    public id: string;
    public display_name: string;
    public avatar: string;
    public messages: Message[];
    public message_count: number;

    constructor(json) {
        this.id = json.id;
        this.display_name = json.display_name;
        this.avatar = json.avatar;
        this.messages = [];
        json.messages.forEach(object => {
            const message = new Message(object);
            this.messages.push(message);
        });
        this.message_count = this.messages.length;
    }
}
