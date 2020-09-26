import { Route } from './Route';

export class Router {
  private static __instance: Router;
  public routes: Route[];
  private history: History;
  private _currentRoute: Route;
  private _rootQuery: string;

  // TODO: refactor singleton
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onhashchange = ((event: HashChangeEvent): void => {
      this._onRoute((event.currentTarget as Window).location.hash);
    }).bind(this);

    window.onpopstate = ((event: PopStateEvent): void => {
      this._onRoute((event.currentTarget as Window).location.hash);
    }).bind(this);

    this._onRoute(window.location.hash);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      console.log(`route not found for path: ${pathname}`);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}