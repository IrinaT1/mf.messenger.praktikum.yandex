import { Message } from '../../business/Message';
import { Block } from '../../utils/Block';
let template = require('./MessagePart.handlebars');

export class MessagePart extends Block {
    constructor(message: Message) {
        super("article", {
            url: message.url,
            text: message.text,
            datetime_text: message.datetime_text
        }, { classes: ["chatdetail-messages-message", `${message.incoming ? "incoming" : "outcoming"}`] });
    }

    render() {
        return template({
            url: this.props.url,
            text: this.props.text,
            datetime_text: this.props.datetime_text
        });
    }
}