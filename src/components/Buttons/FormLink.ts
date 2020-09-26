import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormLink.tmpl';

export class FormLink extends Block {
    constructor(props: { className?: string, text: string, href?: string }) {
        super("a", props, {classes: ["link-back", props.className], href: props.href});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}