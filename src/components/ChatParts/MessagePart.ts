import { textChangeRangeIsUnchanged } from "typescript";
import { ChatDetails } from "../../business/ChatDetails.js";
import { Message } from "../../business/Message.js";
import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from './MessagePart.tmpl.js';

export class MessagePart extends Block {
    constructor(message: Message) {
        super("article", {
            url: message.url,
            text: message.text
        }, { classes: ["chatdetail-messages-message", `${message.incoming ? "incoming" : "outcoming"}`] });
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            url: this.props.url,
            text: this.props.text
        });
    }
}