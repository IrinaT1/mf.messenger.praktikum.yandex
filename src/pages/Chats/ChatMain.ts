import { Block } from "../../utils/Block.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ItemPart, HeadPart, MessagesPart } from "../../components/Components.js";
import { render } from "../../utils/Render.js";
import { ChatInfo } from "../../business/ChatInfo.js";
import { ChatDetails } from "../../business/ChatDetails.js";

export class ChatMainPage extends Block {
    constructor() {
        super("div", {
            loading: true
        }, { classes: ["chats-wrapper"] });
    }

    componentRendered(): void {
        let chatListLoader = this.getContent().querySelector(".chatlist-loader") as HTMLElement;

        getAPIServer().chats().then((data) => {
            chatListLoader.style.display = "none";

            this.drawChatList(data);
        });
    }

    itemParts: ItemPart[] = [];
    headPart: HeadPart;
    messagesPart: MessagesPart;

    drawChatList = (data: ChatInfo[]): void => {
        data.forEach((chatInfo) => {
            let itemPartBlock = new ItemPart(chatInfo);
            itemPartBlock.componentRendered = () => {
                document.getElementById(itemPartBlock.id()).addEventListener('click', () => { this.chatSelected(itemPartBlock.chatInfo); });
            };

            this.itemParts.push(itemPartBlock);
            render(".chatlist-root", itemPartBlock);
        });
    }

    chatSelected = (chatInfo: ChatInfo) => {
        this.itemParts.forEach((item) => {
            if (item.chatInfo === chatInfo) {
                item.select();
            } else {
                item.unselect();
            }
        });

        this.drawHead(chatInfo);

        chatInfo.details().then((data: ChatDetails) => {
            this.drawMessages(data);
        });
    }

    drawHead(data: ChatInfo) {
        if (this.headPart === undefined || this.headPart === null) {
            this.headPart = new HeadPart(data);
            render(".chathead-root", this.headPart);
        } else {
            this.headPart.setProps({ name: data.display_name });
        }
    }

    drawMessages(data: ChatDetails) {
        if (this.messagesPart === undefined || this.messagesPart === null) {
            this.messagesPart = new MessagesPart(data);
            render(".chatdetail-messages-root", this.messagesPart);
        } else {
            this.messagesPart.setProps({id: data.user_id});
        }        
    }

    render() {
        return template;
    }
}