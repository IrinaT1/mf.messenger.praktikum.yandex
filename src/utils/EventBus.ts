export class EventBus {
    private listeners: Record<string, Function[]>;
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            throw new Error(`No such event: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: Record<string, string | number | boolean>[]): void {
        if (!this.listeners[event]) {
            throw new Error(`No such event: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}