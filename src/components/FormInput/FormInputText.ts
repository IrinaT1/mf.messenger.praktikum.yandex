import { Block, PropsType } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./FormInputText.tmpl.js";

export class FormInputText extends Block {
    constructor(props: { className?: string, name: string, value: string, required: boolean, label: string }) {

        let maybeRequired: string = props.required ? "required" : "";
        let newProps: PropsType = {};
        Object.assign(newProps, props);
        newProps.maybeRequired = maybeRequired;

        super("div", newProps, {classes: ["input-container", props.className]});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}