import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./FormButton.tmpl.js";

export class FormButton extends Block {
    constructor(props: { className?: string, text: string, isPrimary: boolean }) {

        let typeClassName = props.isPrimary ? "primary" : "secondary";
        super("button", props, {classes: ["button-submit", typeClassName, props.className], type: "button"});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}