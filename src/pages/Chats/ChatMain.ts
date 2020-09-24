import { Block } from "../../utils/Block.js";
import { template } from './ChatMain.tmpl.js';
import { getAPIServer } from '../../server/Server.js';
import { ItemPart, HeadPart, MessagePart } from "../../components/Components.js";
import { render } from "../../utils/Render.js";
import { ChatInfo } from "../../business/ChatInfo.js";
import { ChatDetails } from "../../business/ChatDetails.js";
import { Message } from "../../business/Message.js";

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

        this.sendMessageSetup();
    }

    selectedChatInfo: ChatInfo;
    itemParts: ItemPart[] = [];
    headPart: HeadPart;
    messageParts: MessagePart[] = [];

    messagesContainer: HTMLElement;
    newMessageInput: HTMLSelectElement;

    sendMessageSetup(): void {
        this.messagesContainer = this.getContent().querySelector(".chatdetail-messages-root");
        let buttonSend = this.getContent().querySelector(".chatdetail-newmessage-send") as HTMLElement;
        this.newMessageInput = this.getContent().querySelector(".chatdetail-newmessage-input") as HTMLSelectElement;

        buttonSend.addEventListener('click', () => { this.sendMessage(); });
    }

    sendMessage(): void {
        let text = this.newMessageInput.value;

        const updateScroll = () => {
            window.scrollTo(0, this.messagesContainer.offsetHeight);
        }

        if (this.selectedChatInfo === null || this.selectedChatInfo === undefined) {
            console.log("select chat first!");
        } else if (text.trim() === "") {
            console.log("message is empty!");
        } else {
            let message = Message.create(text);
            let messageBlock = new MessagePart(message);
            this.messageParts.push(messageBlock);
            render(".chatdetail-messages-root", messageBlock);

            this.newMessageInput.value = "";
            updateScroll();
        }
    }

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
        this.selectedChatInfo = chatInfo;
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
        this.messageParts.forEach((messagePart) => {
            messagePart.remove();
        });
        this.messageParts = [];

        let messages = data.messages;
        messages.forEach((message) => {
            let messageBlock = new MessagePart(message);
            this.messageParts.push(messageBlock);
            render(".chatdetail-messages-root", messageBlock);
        });
    }

    render() {
        return template;
    }
}