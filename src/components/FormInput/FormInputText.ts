import { Block, PropsType } from '../../utils/Block';
import { handlebars } from '../../utils/Handlebars';
import { template } from './FormInputText.tmpl';

type FormInputTextPropsType = {
    className?: string;
    name: string;
    value: string;
    label: string;
    required: boolean;
}

export class FormInputText extends Block {
    constructor(props: FormInputTextPropsType) {

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