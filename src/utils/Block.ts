import { EventBus } from './EventBus.js';
import { UniqueIdGenerator } from './UniqueIdGenerator.js';

export type PropsValueType = string | number | boolean;
export type PropsType = Record<string, PropsValueType>;

export class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    private _meta = null;

    public props: PropsType;
    public eventBus: () => EventBus;

    constructor(tagName: string = "div", props: PropsType = {}, tagAttributes: { classes?: string[], type?: string, href?: string } = { classes: [] }) {
        const eventBus = new EventBus();
        let id = UniqueIdGenerator.get();
        this._meta = {
            tagName,
            tagAttributes,
            props,
            id: id
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources(): void {
        const { tagName, tagAttributes, id } = this._meta;
        this._element = this._createDocumentElement(tagName);

        let tagClassList = tagAttributes.classes;
        tagClassList.forEach(tagClass => {
            if (tagClass !== undefined && tagClass !== "undefined" && tagClass !== "")
                this._element.classList.add(tagClass);
        });

        if (tagAttributes.type !== undefined && tagAttributes.type !== "") {
            this._element.setAttribute('type', tagAttributes.type);
        }
        if (tagAttributes.href !== undefined && tagAttributes.href !== "") {
            this._element.setAttribute('href', tagAttributes.href);
        }
        this._element.setAttribute('id', id);
    }

    id(): string {
        return this._meta.id;
    }

    init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(): void { }

    _componentDidUpdate(): void {
        const response = this.componentDidUpdate();

        if (response) {
            this._render();
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(): boolean {
        return true;
    }

    setProps(nextProps: PropsType) {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        // this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напиши свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы превращать из возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    }

    componentRendered(): void {
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return 'Please provide render data';
    };

    getContent(): HTMLElement {
        return this.element;
    }

    getContentAsText(): string {
        return this.getContent().outerHTML;
    }

    _makePropsProxy(props: PropsType): PropsType {
        let proxyProps = new Proxy(props, {
            get(target: PropsType, prop: string): PropsValueType {
                return target[prop];
            },

            set: (target: PropsType, prop: string, val: PropsValueType): boolean => {
                target[prop] = val;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },

            deleteProperty(target, prop): boolean {
                throw Error("Error: couldn't delete");
            }
        });

        return proxyProps;
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        // this.getContent().style.display = "block";
        this.getContent().removeAttribute("style");
    }

    hide() {
        this.clearData();
        this.getContent().style.display = "none";
    }

    clearData() { }
}