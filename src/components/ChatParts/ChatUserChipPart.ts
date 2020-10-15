import { Block } from '../../utils/Block';
import { User } from '../../business/User';
const template = require('./ChatUserChipPart.handlebars');

export class ChatUserChipPart extends Block {
    constructor(public user: User) {
        super("div", {
            avatarURL: user.data.avatar,
            display_name: user.data.display_name ?? user.data.first_name + " " + user.data.second_name
        }, { classes: ["chip"] });
    }

    render() {
        return template({
            avatarURL: this.props.avatarURL,
            display_name: this.props.display_name
        });
    }
}
