/**
 * @description sends HTTP requests
 * @example
 * new HTTPTransport().get('https://chats', {timeout: 5000, headers: {"h1": "v1", "h2": "v2"}, data: {}});
 * 
 * new HTTPTransport().delete('https://chats', { timeout: 5000, headers: { "h1": "v1", "h2": "v2" }, data: { "d1": "dv1" }});
 */

type DataType = Record<string, string | number | Array<string> | Array<number> | boolean> | FormData;

export type HttpRequestOptions = {
    timeout?: number;
    headers?: Record<string, string>;
    method?: string;
    data?: DataType;
    withCredentials?: boolean;
}

//This class will be used later in the next sprint for API calls implementation
export class HTTPTransport {

    METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: "PUT",
        DELETE: "DELETE"
    };

    get = (url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.GET }, options.timeout, options.withCredentials);
    };

    put = (url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.PUT }, options.timeout, options.withCredentials);
    };

    post = (url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.POST }, options.timeout, options.withCredentials);
    };

    delete = (url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: this.METHODS.DELETE }, options.timeout, options.withCredentials);
    };

    request = (url: string, options: HttpRequestOptions, timeout = 5000, withCredentials = true): Promise<XMLHttpRequest> => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = withCredentials;

            if (method === this.METHODS.GET && data) {
                xhr.open(method, url + this.queryStringify(data));
            } else {
                xhr.open(method, url);
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            if (headers) {
                for (const header of Object.keys(headers)) {
                    xhr.setRequestHeader(header, headers[header]);
                }
            }

            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === this.METHODS.GET || !data) {
                xhr.send();
            } else {
                if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            }
        });
    };

    queryStringify = (data: DataType): string => {
        if (!data || Object.keys(data).length === 0) {
            return "";
        }

        let dataString = "";
        for (const key of Object.keys(data)) {
            if (typeof data[key] === 'object') {
                throw Error("not yet implemented");
            }
            dataString += (dataString === "") ? "?" : "&";
            dataString += `${key}=${data[key]}`;
        }
        return dataString;
    }
}
