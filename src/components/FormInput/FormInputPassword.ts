import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormInputPassword.tmpl';

type FormInputPasswordPropsType = {
    className?: string;
    name: string;
    value: string;
    label: string;
}

export class FormInputPassword extends Block {
    constructor(props: FormInputPasswordPropsType) {
        super("div", props, {classes: ["input-container", props.className]});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}