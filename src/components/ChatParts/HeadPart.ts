import { ChatInfo } from '../../business/ChatInfo';
import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './HeadPart.tmpl';


export class HeadPart extends Block {
    constructor(chatInfo: ChatInfo) {
        super("h2", {
            name: chatInfo.display_name
        }, { classes: ["chatdetail-chatinfo-name"] });
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            name: this.props.name
        });
    }
}