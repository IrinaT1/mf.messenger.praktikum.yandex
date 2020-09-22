var EventBus = /** @class */ (function () {
    function EventBus() {
        this.listeners = {};
    }
    EventBus.prototype.on = function (event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    };
    EventBus.prototype.off = function (event, callback) {
        if (!this.listeners[event]) {
            throw new Error("No such event: " + event);
        }
        this.listeners[event] = this.listeners[event].filter(function (listener) { return listener !== callback; });
    };
    EventBus.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.listeners[event]) {
            throw new Error("No such event: " + event);
        }
        this.listeners[event].forEach(function (listener) {
            listener.apply(void 0, args);
        });
    };
    return EventBus;
}());
export { EventBus };
//# sourceMappingURL=EventBus.js.map