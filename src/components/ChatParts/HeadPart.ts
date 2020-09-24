import { ChatInfo } from "../../business/ChatInfo.js";
import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from './HeadPart.tmpl.js';


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