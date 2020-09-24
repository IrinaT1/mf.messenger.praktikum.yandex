export class Message {

    public incoming: boolean;
    public text: string;
    public url: string;
    //public timestamp: number;
    public datetime_text: string;

    constructor(private jsonData) {
        this.incoming = jsonData.incoming;
        this.text = jsonData.text;
        this.url = jsonData.url;
        this.datetime_text = jsonData.datetime_text;
    }

    json() {
        return this.jsonData;
    };
}

let fakeMessageJson = `
{
    "incoming": true,
    "text": "Hi this is last message from Vasya!",
    "url": "",
    "timestamp": 1327611110417,
    "datetime_text": "8:30 am"
}
`;

export let fakeMessage = new Message(JSON.parse(fakeMessageJson));