import { Block } from '../../utils/Block';
const template = require('./FormInputPassword.handlebars');

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
        return template(this.props);
    }
}