import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormLink.tmpl';

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
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}