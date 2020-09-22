import { render } from './Render.js';
var Route = /** @class */ (function () {
    function Route(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    Route.prototype.navigate = function (pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    };
    Route.prototype.leave = function () {
        if (this._block) {
            this._block.hide();
        }
    };
    Route.prototype.match = function (pathname) {
        return pathname === this._pathname;
    };
    Route.prototype.render = function () {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    };
    return Route;
}());
export { Route };
//# sourceMappingURL=Route.js.map