import { Block } from "../../utils/Block.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";
import { router } from "../../utils/Utils.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ChatItem } from "../../components/ChatParts/ChatItem.js";
import { render } from "../../utils/Render.js";

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
        let chatListLoader = this.getContent().querySelector(".chatlist-loader") as HTMLElement;

        getAPIServer().chats().then((data) => {
            chatListLoader.style.display = "none";

            let chatItems: ChatItem[] = [];

            const selectChatItem = (chatItem: ChatItem) => {
                console.log("selected chatItem name = ", chatItem.props.display_name);
                // chatItem.setProps({
                //     display_name: chatItem.props.display_name + "1",
                // });

                chatItems.forEach((item) => {
                    if (item == chatItem) {
                        item.select();
                    } else {
                        item.unselect();
                    }
                });
            }

            data.forEach((chatInfo) => {
                let chatItemBlock = new ChatItem(chatInfo, false);
                chatItemBlock.componentRendered = () => {
                    document.getElementById(chatItemBlock.id()).addEventListener('click', () => { selectChatItem(chatItemBlock); });
                };

                chatItems.push(chatItemBlock);
                render(".chatlist-root", chatItemBlock);
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