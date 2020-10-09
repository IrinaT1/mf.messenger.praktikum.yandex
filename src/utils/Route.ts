import { Block } from './Block';
import { render } from './Render';

export class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _props: { rootQuery: string };
    private _block: Block;

    constructor(pathname: string, view: typeof Block, props: { rootQuery: string }) {
        if (pathname.charAt(0) === '/') {
            pathname = pathname.substring(1);
        }
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            //this._block.hide();
            this._block.remove();
            this._block = null;
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
        } else {
            this._block.show();
        }
    }

    path(): string {
        return this._pathname;
    }
}