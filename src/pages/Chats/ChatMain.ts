import { Block } from "../../utils/Block.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ChatItem } from "../../components/ChatParts/ChatItem.js";
import { render } from "../../utils/Render.js";

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

    chatSelected = (id: string) => {
        this.chatItems.forEach((item) => {
            if (item.props.user_id === id) {
                item.select();
            } else {
                item.unselect();
            }
        });
    }

    drawChatList(): void {
        let chatListLoader = this.getContent().querySelector(".chatlist-loader") as HTMLElement;

        getAPIServer().chats().then((data) => {
            chatListLoader.style.display = "none";

            data.forEach((chatInfo) => {
                let chatItemBlock = new ChatItem(chatInfo);
                chatItemBlock.componentRendered = () => {
                    document.getElementById(chatItemBlock.id()).addEventListener('click', () => { this.chatSelected(chatInfo.user_id); });
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