import { Block } from '../../utils/Block';
let template = require('./FormInputEmail.handlebars');

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
        return template(this.props);
    }
}