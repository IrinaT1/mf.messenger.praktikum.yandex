import { Block } from '../../utils/Block';
const template = require("./FormLink.handlebars");

type FormLinkPropsType = {
    className?: string;
    text: string;
    href?: string;
}

export class FormLink extends Block {
    constructor(props: FormLinkPropsType) {
        super("a", props, {classes: ["link-back", props.className], href: props.href});
    }

    render() {
        return template(this.props);
    }
}