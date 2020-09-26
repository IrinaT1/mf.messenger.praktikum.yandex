import * as mocha from 'mocha';
import * as chai from 'chai';
import { TestPage } from '../pages/Pages';
import { Router } from './Router';

mocha.describe("Router", function() {

    mocha.it("new Router has 0 routes", function() {
        let router = new Router(".root");
        chai.assert.equal(router.routes.length, 0);
    });

    mocha.it("Can add a route", function() {
        let router = new Router(".root");
        router.use("/123", TestPage);
        chai.assert.equal(router.routes.length, 1);
    });
});