import { ChatInfo } from '../business/ChatInfo';
import { HttpRequestOptions } from '../utils/HTTPTransport';
import { HTTPTransport } from '../utils/Utils';

export type HTTPResponse = {
    status: number;
    response: string;
}

export class APIServer {

    protected http: HTTPTransport;
    constructor(protected baseUrl: String) {
        this.http = new HTTPTransport();
    }

    protected get(url: string, options?: HttpRequestOptions): Promise<HTTPResponse> {
        return this.parseResponse(this.http.get(this.baseUrl + url, options));
    }

    protected put(url: string, options?: HttpRequestOptions): Promise<HTTPResponse> {
        return this.parseResponse(this.http.put(this.baseUrl + url, options));
    }

    protected post(url: string, options?: HttpRequestOptions): Promise<HTTPResponse> {
        return this.parseResponse(this.http.post(this.baseUrl + url, options));
    }

    protected delete(url: string, options?: HttpRequestOptions): Promise<HTTPResponse> {
        return this.parseResponse(this.http.delete(this.baseUrl + url, options));
    }

    private parseResponse(promise: Promise<XMLHttpRequest>): Promise<HTTPResponse> {
        return new Promise(function (resolve, reject) {
            promise.then((data: XMLHttpRequest) => {
                const status = data.status;
                const resp: HTTPResponse = { status: status, response: data.response };
                if (status === 200) {
                    resolve(resp);
                } else {
                    reject(resp);
                }
            }).catch((error) => {
                const resp: HTTPResponse = { status: 1, response: error };
                reject(resp);
            });
        });
    }
}

// const fakeChatsResponse = `
// {
//     "chats": [{
//         "id": "001",
//         "display_name": "Vasya",
//         "login": "vasya123",
//         "avatar": "https://picsum.photos/100",
//         "last_message": {
//             "incoming": true,
//             "text": "Hi this is last message from Vasya!",
//             "url": "",
//             "timestamp": 1327611110417,
//             "datetime_text": "8:30 am"
//         }
//     },
//     {
//         "id": "002",
//         "display_name": "Masha",
//         "login": "masha2345",
//         "avatar": "https://picsum.photos/200",
//         "last_message": {
//             "incoming": false,
//             "text": "Hi this is last message from Masha!",
//             "url": "",
//             "timestamp": 1327611110417,
//             "datetime_text": "7:30 am"
//         }
//     }]
// }
// `;
