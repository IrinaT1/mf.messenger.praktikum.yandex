/**
 * @description sends HTTP requests
 * @example
 * new HTTPTransport().get('https://chats', {timeout: 5000, headers: {"h1": "v1", "h2": "v2"}, data: {}});
 * 
 * new HTTPTransport().delete('https://chats', { timeout: 5000, headers: { "h1": "v1", "h2": "v2" }, data: { "d1": "dv1" }});
 */

export class HTTPTransport {
    get = (url, options = {}) => {
        return this.request(url, { ...options, method: this.METHODS.GET }, options.timeout, options.headers);
    };

    put = (url, options = {}) => {
        return this.request(url, { ...options, method: this.METHODS.PUT }, options.timeout, options.headers);
    };

    post = (url, options = {}) => {
        return this.request(url, { ...options, method: this.METHODS.POST }, options.timeout, options.headers);
    };

    delete = (url, options = {}) => {
        return this.request(url, { ...options, method: this.METHODS.DELETE }, options.timeout, options.headers);
    };

    METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: "PUT",
        DELETE: "DELETE"
    };

    request = (url, options, timeout = 5000) => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            if (method === METHODS.GET && data) {
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

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };

    queryStringify = (data) => {
        if (!data || Object.keys(data).kength === 0) {
            return "";
        }
    
        let dataString = "";
        for (let key of Object.keys(data)) {
            dataString += (dataString === "") ? "?" : "&";
            dataString += `${key}=${data[key]}`;
        }
        return dataString;
    }
}