/**
 * @description sends HTTP requests
 * @example
 * new HTTPTransport().get('https://chats', {timeout: 5000, headers: {"h1": "v1", "h2": "v2"}, data: {}});
 *
 * new HTTPTransport().delete('https://chats', { timeout: 5000, headers: { "h1": "v1", "h2": "v2" }, data: { "d1": "dv1" }});
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var HTTPTransport = /** @class */ (function () {
    function HTTPTransport() {
        var _this = this;
        this.METHODS = {
            GET: 'GET',
            POST: 'POST',
            PUT: "PUT",
            DELETE: "DELETE"
        };
        this.get = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: _this.METHODS.GET }), options.timeout);
        };
        this.put = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: _this.METHODS.PUT }), options.timeout);
        };
        this.post = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: _this.METHODS.POST }), options.timeout);
        };
        this.delete = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: _this.METHODS.DELETE }), options.timeout);
        };
        this.request = function (url, options, timeout) {
            if (timeout === void 0) { timeout = 5000; }
            var method = options.method, data = options.data, headers = options.headers;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                if (method === _this.METHODS.GET && data) {
                    xhr.open(method, url + _this.queryStringify(data));
                }
                else {
                    xhr.open(method, url);
                }
                xhr.onload = function () {
                    resolve(xhr);
                };
                for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                    var header = _a[_i];
                    xhr.setRequestHeader(header, headers[header]);
                }
                xhr.timeout = timeout;
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === _this.METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    var formData = new FormData();
                    for (var key in data) {
                        formData.append(key, data[key]);
                    }
                    xhr.send(formData);
                }
            });
        };
        this.queryStringify = function (data) {
            if (!data || Object.keys(data).length === 0) {
                return "";
            }
            var dataString = "";
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var key = _a[_i];
                if (typeof data[key] === 'object') {
                    throw Error("not yet implemented");
                }
                dataString += (dataString === "") ? "?" : "&";
                dataString += key + "=" + data[key];
            }
            return dataString;
        };
    }
    return HTTPTransport;
}());
export { HTTPTransport };
//# sourceMappingURL=HTTPTransport.js.map