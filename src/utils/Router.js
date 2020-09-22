import { Route } from "./Route.js";
var Router = /** @class */ (function () {
    function Router(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }
    Router.prototype.use = function (pathname, block) {
        var route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    };
    Router.prototype.start = function () {
        var _this = this;
        window.onpopstate = (function (event) {
            _this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
        this._onRoute(window.location.pathname);
    };
    Router.prototype._onRoute = function (pathname) {
        var route = this.getRoute(pathname);
        if (!route) {
            console.log("route not found for path: " + pathname);
            return;
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    };
    Router.prototype.go = function (pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    };
    Router.prototype.back = function () {
        this.history.back();
    };
    Router.prototype.forward = function () {
        this.history.forward();
    };
    Router.prototype.getRoute = function (pathname) {
        return this.routes.find(function (route) { return route.match(pathname); });
    };
    return Router;
}());
export { Router };
//# sourceMappingURL=Router.js.map