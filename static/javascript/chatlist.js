import { chatlistTemplate, chatdetailsNameTemplate, chatdetailsMessagesTemplate } from '../templates/chatlist.tmpl.js';
import { handlebars } from './helpers/handlebars.js';
var context = {
    "chats": [{
            "selected": false,
            "display_name": "Vasya",
            "login": "vasya123",
            "avatar": "https://picsum.photos/100",
            "messages": [{
                    "incoming": true,
                    "text": "Hi this is message 1 from Vasya!",
                    "url": "",
                    "timestamp": 1327611110417,
                    "datetime_text": "8:20 am"
                },
                {
                    "incoming": false,
                    "text": "",
                    "url": "https://picsum.photos/300",
                    "timestamp": 1327611110417,
                    "datetime_text": "8:20 am"
                },
                {
                    "incoming": true,
                    "text": "Hi this is message 2 from Vasya!",
                    "url": "",
                    "timestamp": 1327611110417,
                    "datetime_text": "8:30 am"
                }
            ],
            "last_message": {
                "incoming": true,
                "text": "Hi this is last message from Vasya!",
                "url": "",
                "timestamp": 1327611110417,
                "datetime_text": "8:30 am"
            }
        },
        {
            "selected": true,
            "display_name": "Masha",
            "login": "masha2345",
            "avatar": "https://picsum.photos/200",
            "messages": [{
                    "incoming": false,
                    "text": "Hi this is message 1 from Masha!",
                    "url": "",
                    "timestamp": 1327611110417,
                    "datetime_text": "7:20 am"
                },
                {
                    "incoming": true,
                    "text": "",
                    "url": "https://picsum.photos/300",
                    "timestamp": 1327611110417,
                    "datetime_text": "7:20 am"
                },
                {
                    "incoming": false,
                    "text": "Hi this is message 2 from Masha!",
                    "url": "",
                    "timestamp": 1327611110417,
                    "datetime_text": "7:30 am"
                }
            ],
            "last_message": {
                "incoming": false,
                "text": "Hi this is last message from Masha!",
                "url": "",
                "timestamp": 1327611110417,
                "datetime_text": "7:30 am"
            }
        }
    ]
};
var chatListContext = context;
var templateCL = handlebars().compile(chatlistTemplate);
var chatlistRoot = document.querySelector(".chatlist-root");
chatlistRoot.innerHTML = templateCL(chatListContext);
var chatDetailsContext = chatListContext.chats.find(function (chat) { return chat.selected === true; });
var templateCDName = handlebars().compile(chatdetailsNameTemplate);
var chatdetailsNameRoot = document.querySelector(".chatdetail-name-root");
chatdetailsNameRoot.innerHTML = templateCDName(chatDetailsContext);
var templateCDMessages = handlebars().compile(chatdetailsMessagesTemplate);
var chatdetailsMessagesRoot = document.querySelector(".chatdetail-messages-root");
chatdetailsMessagesRoot.innerHTML = templateCDMessages(chatDetailsContext);
var sendMessage = function () {
    var value = document.querySelector('.chatdetail-newmessage-input').value;
    console.log("Sending data: ", JSON.stringify({ "value": value }));
};
document.querySelector('.chatdetail-newmessage-send').addEventListener('click', sendMessage);
//# sourceMappingURL=chatlist.js.map