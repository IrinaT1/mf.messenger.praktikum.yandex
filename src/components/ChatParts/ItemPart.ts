import { Block } from '../../utils/Block';
import { ChatInfo } from '../../business/ChatInfo';
const template = require('./ItemPart.handlebars');

export class ItemPart extends Block {
    constructor(public chatInfo: ChatInfo) {
        super("li", {
            id: chatInfo.data.id,
            avatarURL: chatInfo.data.avatar,
            display_name: chatInfo.data.title,
            // last_message: chatInfo.last_message.json()
            last_message: ""
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
