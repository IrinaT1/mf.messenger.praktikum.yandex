import * as chai from 'chai';
import { TestPage } from '../pages/Pages';
import { Router } from './Router';

describe("Router", function() {

    it("new Router has 0 routes", function() {
        const router = new Router(".root");
        chai.assert.equal(router.routes.length, 0);
    });

    it("Can add a route", function() {
        const router = new Router(".root");
        router.use("/123", TestPage);
        chai.assert.equal(router.routes.length, 1);
    });
});
