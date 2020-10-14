import { Block } from '../../utils/Block';
import { getAuthServer, getChatServer } from '../../server/Server';
import { ItemPart, HeadPart, MessagePart, FormButton } from '../../components/Components';
import { render } from '../../utils/Render';
import { ChatInfo, ChatInfoDataType } from '../../business/ChatInfo';
import { ChatDetails } from '../../business/ChatDetails';
import { Message } from '../../business/Message';
import { router } from '../../utils/Utils';
import { User, UserDataType } from '../../business/User';
const template = require('./ChatMain.handlebars');

export class ChatMainPage extends Block {

    private static addChatButton: string = new FormButton({
        text: "Add New Chat",
        isPrimary: false
    }).getContentAsText();

    constructor() {
        super("div", {
            addChatButton: ChatMainPage.addChatButton
        }, { classes: ["chats-wrapper"] });
    }

    
    selectedChatInfo: ChatInfo;
    itemParts: ItemPart[] = [];
    headPart: HeadPart;
    messageParts: MessagePart[] = [];

    messagesContainer: HTMLElement;
    newMessageInput: HTMLSelectElement;
    chatListLoader: HTMLElement;

    user: User;

    componentRendered(): void {
        this.chatListLoader = this.getContent().querySelector(".chatlist-loader") as HTMLElement;
        const chatUserHeader = this.getContent().querySelector(".username-header") as HTMLElement;
        const logoutButton = this.getContent().querySelector(".chats-logout") as HTMLElement;
        const addNewChatButton = this.getContent().querySelector(".add-chat-button-wrapper button") as HTMLElement;

        getAuthServer().auth().then((data) => {
            this.user = new User(JSON.parse(data.response) as UserDataType);
            console.log("User successfully obtained, user = ", this.user);

            this.updateChatList();

            chatUserHeader.textContent = "Hi " + (this.user.data.display_name ?? this.user.data.first_name) + "!";

            logoutButton.addEventListener('click', () => {
                getAuthServer().logout().then((data) => {
                    console.log("signing out previous user, data = ", data);
                }).catch((error) => {
                    console.log("signing out previous user failed, error = ", error);
                }).finally(() => {
                    router.go("#login");
                });
            });

            let nNewChats = 0;

            addNewChatButton.addEventListener('click', () => {
                nNewChats += 1;
                getChatServer().createChat("Chat " + nNewChats).then((data) => {
                    console.log("chat created, data = ", data);

                    this.updateChatList();
                }).catch((error) => {
                    console.log("error creating chat, error = ", error);
                    alert(JSON.parse(error.response).reason ?? "Error");
                });
            });

            this.sendMessageSetup();
        }).catch((error) => {
            console.log("User data is not available, error = ", error);
            router.go("#login");
        });
    }


    updateChatList(): void {
        getChatServer().chats().then((data) => {
            console.log("got chats, data = ", data);
            this.chatListLoader.style.display = "none";

            let chats: ChatInfo[] = [];
            const chatsArray = JSON.parse(data.response) as ChatInfoDataType[];
            chats = chatsArray.map((e) => {
                return new ChatInfo(e);
            }); 

            this.drawChatList(chats);
        }).catch((error) => {
            console.log("error getting chats, error = ", error);
        });
    }

    sendMessageSetup(): void {
        this.messagesContainer = this.getContent().querySelector(".chatdetail-messages-root");
        const buttonSend = this.getContent().querySelector(".chatdetail-newmessage-send") as HTMLElement;
        this.newMessageInput = this.getContent().querySelector(".chatdetail-newmessage-input") as HTMLSelectElement;

        buttonSend.addEventListener('click', () => { this.sendMessage(); });
    }

    sendMessage(): void {
        const text = this.newMessageInput.value;

        const updateScroll = () => {
            window.scrollTo(0, this.messagesContainer.offsetHeight);
        }

        if (!this.selectedChatInfo) {
            console.log("select chat first!");
        } else if (text.trim() === "") {
            console.log("message is empty!");
        } else {
            const message = Message.create(text);
            const messageBlock = new MessagePart(message);
            this.messageParts.push(messageBlock);
            render(".chatdetail-messages-root", messageBlock);

            this.newMessageInput.value = "";
            updateScroll();
        }
    }

    drawChatList = (data: ChatInfo[]): void => {
        this.itemParts.forEach((itemPart) => {
            itemPart.remove();
        });
        this.itemParts = [];

        data.forEach((chatInfo) => {
            const itemPartBlock = new ItemPart(chatInfo);
            itemPartBlock.componentRendered = () => {
                document.getElementById(itemPartBlock.id()).addEventListener('click', () => { this.chatSelected(itemPartBlock.chatInfo); });
            };

            this.itemParts.push(itemPartBlock);
            render(".chatlist-root", itemPartBlock);

            itemPartBlock.getContent().querySelector(".delete-chat-button")
                .addEventListener('click', (event) => { 
                    event.stopPropagation();
                    getChatServer().deleteUsers([this.user.data.id], chatInfo.data.id).then((data) => {
                        console.log("chat successfully deleted, title = ", chatInfo.data.title);
                    }).catch((error) => {
                        console.log("error deleting chat, error = ", error);
                    }).finally(() => {
                        itemPartBlock.remove();
                    });
                });
        });
    }

    chatSelected = (chatInfo: ChatInfo) => {
        (this.getContent().querySelector(".chathead-no-chat-selected") as HTMLElement).style.display = "none";

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
        if (!this.headPart) {
            this.headPart = new HeadPart(data);
            render(".chathead-root", this.headPart);
        } else {
            this.headPart.setProps({ name: data.data.title });
        }
    }

    drawMessages(data: ChatDetails) {
        this.messageParts.forEach((messagePart) => {
            messagePart.remove();
        });
        this.messageParts = [];

        const messages = data.messages;
        messages.forEach((message) => {
            const messageBlock = new MessagePart(message);
            this.messageParts.push(messageBlock);
            render(".chatdetail-messages-root", messageBlock);
        });
    }

    render() {
        return template({
            addChatButton: this.props.addChatButton,
        });
    }
}
