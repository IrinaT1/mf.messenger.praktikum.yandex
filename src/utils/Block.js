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
import { EventBus } from './EventBus.js';
var Block = /** @class */ (function () {
    function Block(tagName, props) {
        if (tagName === void 0) { tagName = "div"; }
        if (props === void 0) { props = {}; }
        this._element = null;
        this._meta = null;
        var eventBus = new EventBus();
        this._meta = {
            tagName: tagName,
            props: props
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };
    Block.prototype._createResources = function () {
        var tagName = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    };
    Block.prototype.init = function () {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };
    Block.prototype._componentDidMount = function () {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    // Может переопределять пользователь, необязательно трогать
    Block.prototype.componentDidMount = function () { };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        var response = this.componentDidUpdate(oldProps, newProps);
        if (response || oldProps !== newProps) {
            this._render();
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    };
    // Может переопределять пользователь, необязательно трогать
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        return true;
    };
    Block.prototype.setProps = function (nextProps) {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        // this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };
    ;
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._render = function () {
        var block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напиши свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы превращать из возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    };
    // Может переопределять пользователь, необязательно трогать
    Block.prototype.render = function () {
        return 'Please provide render data';
    };
    ;
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        var _this = this;
        var proxyProps = new Proxy(props, {
            get: function (target, prop) {
                return target[prop];
            },
            set: function (target, prop, val) {
                target[prop] = val;
                _this.eventBus().emit(Block.EVENTS.FLOW_CDU, __assign({}, target), target);
                return true;
            },
            deleteProperty: function (target, prop) {
                throw Error("Error: couldn't delete");
            }
        });
        return proxyProps;
    };
    Block.prototype._createDocumentElement = function (tagName) {
        // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
        return document.createElement(tagName);
    };
    Block.prototype.show = function () {
        this.getContent().style.display = "block";
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = "none";
    };
    Block.EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=Block.js.map