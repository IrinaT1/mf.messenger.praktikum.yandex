import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./FormLink.tmpl.js";

export class FormLink extends Block {
    constructor(props: { text: string, href?: string }) {
        super("a", props, {classes: ["link-back"], href: props.href});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}