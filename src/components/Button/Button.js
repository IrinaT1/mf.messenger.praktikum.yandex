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
import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./Button.tmpl.js";
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        // Создаём враппер DOM-элемент button
        return _super.call(this, "button", props) || this;
    }
    Button.prototype.render = function () {
        // В данном случае render возвращает строкой разметку из шаблонизатора
        var tmpl = handlebars().compile(template);
        return tmpl(this.props);
    };
    return Button;
}(Block));
export { Button };
//# sourceMappingURL=Button.js.map