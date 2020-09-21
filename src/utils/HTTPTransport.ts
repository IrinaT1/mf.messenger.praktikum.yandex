/**
 * @description sends HTTP requests
 * @example
 * new HTTPTransport().get('https://chats', {timeout: 5000, headers: {"h1": "v1", "h2": "v2"}, data: {}});
 * 
 * new HTTPTransport().delete('https://chats', { timeout: 5000, headers: { "h1": "v1", "h2": "v2" }, data: { "d1": "dv1" }});
 */

interface Options {
    timeout?: number;
    headers?: Record<string, string>;
    method?: string;
    data?: Record<string, any>;
}

export class HTTPTransport {

    METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: "PUT",
        DELETE: "DELETE"
    };

    get = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.GET }, options.timeout);
    };

    put = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.PUT }, options.timeout);
    };

    post = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.POST }, options.timeout);
    };

    delete = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            if (method === this.METHODS.GET && data) {
                xhr.open(method, url + this.queryStringify(data));
            } else {
                xhr.open(method, url);
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            for (let header of Object.keys(headers)) {
                xhr.setRequestHeader(header, headers[header]);
            }
            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === this.METHODS.GET || !data) {
                xhr.send();
            } else {
                let formData = new FormData();
                for (var key in data) {
                    formData.append(key, data[key]);
                }
                xhr.send(formData);
            }
        });
    };

    queryStringify = (data: Record<string, any>): string => {
        if (!data || Object.keys(data).length === 0) {
            return "";
        }

        let dataString = "";
        for (let key of Object.keys(data)) {
            if (typeof data[key] === 'object') {
                throw Error("not yet implemented");
            }
            dataString += (dataString === "") ? "?" : "&";
            dataString += `${key}=${data[key]}`;
        }
        return dataString;
    }
}