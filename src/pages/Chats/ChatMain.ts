import { Block } from "../../utils/Block.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";
import { router } from "../../utils/Utils.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ChatItem } from "../../components/ChatParts/ChatItem.js";

export class ChatMainPage extends Block {

    constructor() {
        super("div", {
            chatItems: "",
            loading: true
        }, { classes: ["chats-wrapper"] });
    }

    componentRendered(): void {
        this.drawChatList();
    }

    drawChatList(): void {
        let chatListRoot = this.getContent().querySelector(".chatlist-root");
        let chatListLoader = this.getContent().querySelector(".chatlist-loader") as HTMLElement;

        const showChatDetails = (userId: string): void => {
            router.go("#chats/" + userId);
        }

        getAPIServer().chats().then((data) => {
            chatListLoader.style.display = "none";

            data.forEach((chatInfo) => {
                let chatItemBlock = new ChatItem(chatInfo, false);
                let chatItemElement = chatItemBlock.getContent();
                chatListRoot.appendChild(chatItemElement);

                chatItemElement.addEventListener('click', () => {
                    //chatListRoot.replaceChild((new ChatItem(chatInfo, true)).getContent(), chatItemElement);
                    showChatDetails(chatInfo.user_id);
                });
            });
        });
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            loading: this.props.loading,
            chatItems: this.props.chatItems
        });
    }
}