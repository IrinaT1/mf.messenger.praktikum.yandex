import { EventBus } from './EventBus';
import { UniqueIdGenerator } from './UniqueIdGenerator';

export type PropsValueType = string | number | boolean;
export type PropsType = Record<string, PropsValueType>;

type TagAttributePropsType = {
    classes?: string[];
    type?: string;
    href?: string;
}

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
    public eventBus: EventBus;

    constructor(tagName = "div", props: PropsType = {}, tagAttributes: TagAttributePropsType = { classes: [] }) {
        const id = UniqueIdGenerator.get();
        this._meta = {
            tagName,
            tagAttributes,
            props,
            id: id
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = new EventBus();

        this._registerEvents(this.eventBus);
        this.eventBus.emit(Block.EVENTS.INIT);
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

        const tagClassList = tagAttributes.classes;
        tagClassList.forEach(tagClass => {
            if (tagClass)
                this._element.classList.add(tagClass);
        });

        if (tagAttributes.type) {
            this._element.setAttribute('type', tagAttributes.type);
        }
        if (tagAttributes.href) {
            this._element.setAttribute('href', tagAttributes.href);
        }
        this._element.setAttribute('id', id);
    }

    id(): string {
        return this._meta.id;
    }

    init(): void {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь
    componentDidMount(): void { }

    _componentDidUpdate(): void {
        const response = this.componentDidUpdate();

        if (response) {
            this._render();
            this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь
    componentDidUpdate(): boolean {
        return true;
    }

    setProps(nextProps: PropsType) {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    }

    get element() {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        this._element.innerHTML = block;
        // this._element.insertAdjacentHTML('afterbegin', block);
    }

    componentRendered(): void {
    }

    // Может переопределять пользователь
    render(): string {
        return 'Please provide render data';
    }

    getContent(): HTMLElement {
        return this.element;
    }

    getContentAsText(): string {
        return this.getContent().outerHTML;
    }

    _makePropsProxy(props: PropsType): PropsType {
        const proxyProps = new Proxy(props, {
            get(target: PropsType, prop: string): PropsValueType {
                return target[prop];
            },

            set: (target: PropsType, prop: string, val: PropsValueType): boolean => {
                target[prop] = val;
                this.eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },

            deleteProperty(_target, _prop): boolean {
                throw Error("Error: couldn't delete");
            }
        });

        return proxyProps;
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().removeAttribute("style");
    }

    hide() {
        this.clearData();
        this.getContent().style.display = "none";
    }

    remove() {
        this.getContent().remove();
    }

    clearData() { }
}
