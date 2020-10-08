import { Block } from '../../utils/Block';
import { ChatInfo } from '../../business/ChatInfo';
let template = require('./ItemPart.handlebars');

export class ItemPart extends Block {
    constructor(public chatInfo: ChatInfo) {
        super("li", {
            user_id: chatInfo.user_id,
            avatarURL: chatInfo.avatar,
            display_name: chatInfo.display_name,
            last_message: chatInfo.last_message.json()
        }, { classes: ["chatlist-item"] });
    }

    render() {
        return template({
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