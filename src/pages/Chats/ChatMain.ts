import { Block } from "../../utils/Block.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ChatItem, ChatHead, ChatMessages } from "../../components/Components.js";
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

    chatItems: ChatItem[] = [];
    chatHead: ChatHead;
    chatMessages: ChatMessages;

    drawChatList = (data: ChatInfo[]): void => {
        data.forEach((chatInfo) => {
            let chatItemBlock = new ChatItem(chatInfo);
            chatItemBlock.componentRendered = () => {
                document.getElementById(chatItemBlock.id()).addEventListener('click', () => { this.chatSelected(chatItemBlock.chatInfo); });
            };

            this.chatItems.push(chatItemBlock);
            render(".chatlist-root", chatItemBlock);
        });
    }

    chatSelected = (chatInfo: ChatInfo) => {
        this.chatItems.forEach((item) => {
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
        if (this.chatHead === undefined || this.chatHead === null) {
            this.chatHead = new ChatHead(data);
            render(".chathead-root", this.chatHead);
        } else {
            this.chatHead.setProps({ name: data.display_name });
        }
    }

    drawMessages(data: ChatDetails) {
        if (this.chatMessages === undefined || this.chatMessages === null) {
            this.chatMessages = new ChatMessages(data);
            render(".chatdetail-messages-root", this.chatMessages);
        } else {
            this.chatMessages.setProps({id: data.user_id});
        }        
    }

    render() {
        return template;
    }
}