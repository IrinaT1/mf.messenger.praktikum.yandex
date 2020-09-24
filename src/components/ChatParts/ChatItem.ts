import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from './ChatItem.tmpl.js';
import { ChatInfo } from "../../business/ChatInfo.js";

export class ChatItem extends Block {
    constructor(chatInfo: ChatInfo) {
        super("li", {
            user_id: chatInfo.user_id,
            avatarURL: chatInfo.avatar,
            display_name: chatInfo.display_name,
            last_message: chatInfo.last_message.json()
        }, { classes: ["chatlist-item"] });
    }

    componentRendered(): void {
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            avatarURL: this.props.avatarURL,
            display_name: this.props.display_name,
            last_message: this.props.last_message,
        });
    }

    select(): void {
        this.getContent().classList.add("selected");
    }

    unselect(): void {
        this.getContent().classList.remove("selected");
    }
}