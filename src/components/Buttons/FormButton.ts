import { Block } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormButton.tmpl';

type FormButtonPropsType = {
    className?: string;
    text: string;
    isPrimary: boolean;
}

export class FormButton extends Block {
    constructor(props: FormButtonPropsType) {

        let typeClassName = props.isPrimary ? "primary" : "secondary";
        super("button", props, {classes: ["button-submit", typeClassName, props.className], type: "button"});
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}