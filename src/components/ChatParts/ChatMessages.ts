import { ChatDetails } from "../../business/ChatDetails.js";
import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from './ChatMessages.tmpl.js';


export class ChatMessages extends Block {
    constructor(chatDetails: ChatDetails) {
        super("h2", {
            id: chatDetails.user_id
        }, { classes: ["chatdetail-chatinfo-name"] });
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            id: this.props.id
        });
    }
}