import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormInputEmail.tmpl';

type FormInputEmailPropsType = {
    className?: string;
    name: string;
    value: string;
    label: string;
}

export class FormInputEmail extends Block {
    constructor(props: FormInputEmailPropsType) {
        super("div", props, { classes: ["input-container", props.className] });
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}