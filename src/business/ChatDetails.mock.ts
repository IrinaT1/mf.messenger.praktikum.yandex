import { ChatDetails } from "./ChatDetails";

let fakeChatDetailsJson1 = `
{
    "user_id": "123",
    "display_name": "Vasya",
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
        "text": "Hey Vasya, look at this pic!",
        "url": "https://picsum.photos/400/200",
        "timestamp": 1327611110417,
        "datetime_text": "8:20 am"
    },
    {
        "incoming": true,
        "text": "Hi this is message 2 from Vasya!",
        "url": "",
        "timestamp": 1327611110417,
        "datetime_text": "8:30 am"
    }]
}
`;

let fakeChatDetailsJson2 = `
{
    "user_id": "234",
    "display_name": "Masha",
    "avatar": "https://picsum.photos/100",
    "messages": [{
        "incoming": true,
        "text": "Hi this is message 1 from Masha!",
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
        "text": "Hi this is message 2 from Masha!",
        "url": "",
        "timestamp": 1327611110417,
        "datetime_text": "8:30 am"
    }]
}
`;

export const fakeChatDetails1 = new ChatDetails(JSON.parse(fakeChatDetailsJson1));
export const fakeChatDetails2 = new ChatDetails(JSON.parse(fakeChatDetailsJson2));