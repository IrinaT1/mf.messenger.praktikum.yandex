export class Message {

    public incoming: boolean;
    public text: string;
    public url: string;
    public datetime_text: string;

    constructor(private jsonData) {
        this.incoming = jsonData.incoming;
        this.text = jsonData.text;
        this.url = jsonData.url;
        this.datetime_text = jsonData.datetime_text;
    }

    json() {
        return this.jsonData;
    }

    static create(text: string): Message {
        const time = (new Date()).toLocaleString();
        const json = {
            incoming: false,
            text: text,
            url: "",
            datetime_text: time
        };
        return new this(json);
    }
}
