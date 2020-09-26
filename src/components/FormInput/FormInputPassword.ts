import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormInputPassword.tmpl';

export class FormInputPassword extends Block {
    constructor(props: { className?: string, name: string, value: string, label: string }) {
        super("div", props, {classes: ["input-container", props.className]});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}