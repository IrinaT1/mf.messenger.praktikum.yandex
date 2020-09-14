const props = {
    name: 'Abby',
    chat: 'the last of us. Part II',
    getChat() {
        this._privateMethod();
    },
    _privateMethod() {
        console.log(this._privateProp);
    },
    __privateMethodToo() { },
    _privateProp: 'Нельзя получить просто так',
};

const proxyProps = new Proxy(props, {
    get(target, prop) {
        if ([...prop][0] === "_") {
            throw "Error: Нет прав";
        } else {
            let value = target[prop];
            return (typeof value === 'function') ? value.bind(target) : value;
        }
    },

    set(target, prop, val) {
        if ([...prop][0] === "_") {
            throw "Error: Нет прав";
        } else {
            target[prop] = val;
        }
    },

    deleteProperty(target, prop) {
        if ([...prop][0] === "_") {
            throw "Error: Нет прав";
        } else {
            delete target[prop];
        }
    }

});