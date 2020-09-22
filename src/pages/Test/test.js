var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Button } from "../../components/Button/Button.js";
//import { Button } from '/Users/irina/Projects/yandex/mf.messenger.praktikum.yandex/src/components/Button/Button.js'
import { Block } from "../../utils/Block.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";
// Хорошая практика перенести шаблон в template.js. Это позволит 
// не захламлять файл с компонентой и соблюдать консистентность.
var template = "\n<div>\n    {{ button }}\n    {{ userName }}\n</div>\n";
var TestPage = /** @class */ (function (_super) {
    __extends(TestPage, _super);
    function TestPage() {
        var _this = _super.call(this, "div", {
            name: "Login 1",
            button: handlebarsSafeString(new Button({
                className: "className",
                child: "Text 2"
            }).render())
        }) || this;
        console.log("button html: ", new Button({
            className: "className",
            child: "Text 2"
        }).render());
        console.log("button html 2: ", handlebarsSafeString(new Button({
            className: "className",
            child: "Text 2"
        }).render()));
        return _this;
    }
    TestPage.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.setProps({
                name: "Login 3",
            });
        }, 5000);
    };
    TestPage.prototype.render = function () {
        var tmpl = handlebars().compile(template);
        return tmpl({
            userName: this.props.name,
            button: this.props.button
        });
    };
    return TestPage;
}(Block));
export { TestPage };
//# sourceMappingURL=test.js.map