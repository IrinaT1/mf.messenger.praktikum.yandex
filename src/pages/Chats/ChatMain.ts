import { Block } from "../../utils/Block.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ChatItem, ChatHead } from "../../components/Components.js";
import { render } from "../../utils/Render.js";
import { ChatInfo } from "../../business/ChatInfo.js";

export class ChatMainPage extends Block {

    constructor() {
        super("div", {
            loading: true
        }, { classes: ["chats-wrapper"] });
    }

    componentRendered(): void {
        this.drawChatList();
    }

    chatItems: ChatItem[] = [];
    chatHead: ChatHead;

    chatSelected = (chatInfo: ChatInfo) => {
        this.chatItems.forEach((item) => {
            if (item.chatInfo === chatInfo) {
                item.select();
            } else {
                item.unselect();
            }
        });

        if (this.chatHead === undefined || this.chatHead === null) {
            this.chatHead = new ChatHead(chatInfo);
            render(".chathead-root", this.chatHead);
        } else {
            this.chatHead.setProps({ name: chatInfo.display_name });
        }
    }

    drawChatList(): void {
        let chatListLoader = this.getContent().querySelector(".chatlist-loader") as HTMLElement;

        getAPIServer().chats().then((data) => {
            chatListLoader.style.display = "none";

            data.forEach((chatInfo) => {
                let chatItemBlock = new ChatItem(chatInfo);
                chatItemBlock.componentRendered = () => {
                    document.getElementById(chatItemBlock.id()).addEventListener('click', () => { this.chatSelected(chatItemBlock.chatInfo); });
                };

                this.chatItems.push(chatItemBlock);
                render(".chatlist-root", chatItemBlock);
            });
        });
    }

    render() {
        return template;
    }
}