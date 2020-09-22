import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./FormInputPassword.tmpl.js";

export class FormInputPassword extends Block {
    constructor(props: { name: string, value: string, label: string }) {
        super("div", props, {classes: ["input-container"]});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}