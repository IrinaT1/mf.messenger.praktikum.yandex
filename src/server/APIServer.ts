import { ChatInfo } from '../business/ChatInfo';

export class APIServer {

    chats(): Promise<ChatInfo[]> {
        return new Promise((resolve) => {
            console.log("APIServer chats() not yet implemented, returning fake data");

            let data = JSON.parse(fakeChatsResponse);
            let result: ChatInfo[] = [];
            data.chats.forEach(object => {
                result.push(new ChatInfo(object));
            });
            resolve(result);
        });
    }
}

//Эти данные лучше вынести отдельно в константы

const fakeChatsResponse = `
{
    "chats": [{
        "user_id": "001",
        "display_name": "Vasya",
        "login": "vasya123",
        "avatar": "https://picsum.photos/100",
        "last_message": {
            "incoming": true,
            "text": "Hi this is last message from Vasya!",
            "url": "",
            "timestamp": 1327611110417,
            "datetime_text": "8:30 am"
        }
    },
    {
        "user_id": "002",
        "display_name": "Masha",
        "login": "masha2345",
        "avatar": "https://picsum.photos/200",
        "last_message": {
            "incoming": false,
            "text": "Hi this is last message from Masha!",
            "url": "",
            "timestamp": 1327611110417,
            "datetime_text": "7:30 am"
        }
    }]
}
`;
