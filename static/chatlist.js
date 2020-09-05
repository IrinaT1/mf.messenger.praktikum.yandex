import {chatlistTemplate, chatdetailsNameTemplate, chatdetailsMessagesTemplate} from './chatlist.tmpl.js';
import {} from './helpers.js';

const context = {
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

const chatListContext = context;
const templateCL = Handlebars.compile(chatlistTemplate);
const chatlistRoot = document.querySelector(".chatlist-root");
chatlistRoot.innerHTML = templateCL(chatListContext);

const chatDetailsContext = chatListContext.chats.find(chat => chat.selected === true);

const templateCDName = Handlebars.compile(chatdetailsNameTemplate);
const chatdetailsNameRoot = document.querySelector(".chatdetail-name-root");
chatdetailsNameRoot.innerHTML = templateCDName(chatDetailsContext);

const templateCDMessages = Handlebars.compile(chatdetailsMessagesTemplate);
const chatdetailsMessagesRoot = document.querySelector(".chatdetail-messages-root");
chatdetailsMessagesRoot.innerHTML = templateCDMessages(chatDetailsContext);


const sendMessage = () => {
    let value = document.querySelector('.chatdetail-newmessage-input').value;

    console.log('Sending...');
    console.log("data: ", JSON.stringify({"value": value}));
}

document.querySelector('.chatdetail-newmessage-send').addEventListener('click', sendMessage);