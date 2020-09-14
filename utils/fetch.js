/**
 * @description sends HTTP requests n times if it fails
 * @example
 * fetchWithRetry('https://chats', {retries:3, timeout: 5000, headers: {"h1": "v1", "h2": "v2"}, data: {}})
 */

import {HTTPTransport} from "./http-transport.js";

function fetchWithRetry(url, options) {

    let retries = options.retries === undefined ? 1 : options.retries;
    let retry = 1;

    let http = new HTTPTransport();

    return new Promise((resolve, reject) => {
        tryAgain(resolve, reject);
    });

    function tryAgain(resolve, reject) {
        http.request(url, options)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            if (retry < retries) {
                retry += 1;
                tryAgain(resolve, reject);
            } else {
                reject("unsuccessful");
            } 
        });
    }
}