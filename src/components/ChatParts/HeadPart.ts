import { ChatInfo } from '../../business/ChatInfo';
import { Block } from '../../utils/Block';
let template = require('./HeadPart.handlebars');

export class HeadPart extends Block {
    constructor(chatInfo: ChatInfo) {
        super("h2", {
            name: chatInfo.display_name
        }, { classes: ["chatdetail-chatinfo-name"] });
    }

    render() {
        return template({
            name: this.props.name
        });
    }
}