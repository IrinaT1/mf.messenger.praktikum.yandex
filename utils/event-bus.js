/**
 * @description Event Bus
 * @example
 * 
 * const eventBus = new EventBus();
 * const handlerEvent1 = (arg1, arg2) => {console.log('first', arg1, arg2);};
 * 
 * eventBus.on('common:event-1', handlerEvent1);
 * eventBus.emit('common:event-1', 42, 10);
 * eventBus.off('common:event-1', handlerEvent1);
 */

class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        if (!this.listeners[event].includes(callback)) {
            this.listeners[event].push(callback);
        }
    }

    off(event, callback) {
        if (!this.listeners[event]) {
            throw `Error: event not found: ${event}`;
        }
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw `Error: event not found: ${event}`;
        }
        this.listeners[event].forEach((callback) => callback(...args));
    }
}