import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./FormButton.tmpl.js";

export class FormButton extends Block {
    constructor(props: { text: string, isPrimary: boolean }) {

        let className = props.isPrimary ? "primary" : "secondary";
        super("button", props, {classes: ["button-submit", className], type: "button"});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}