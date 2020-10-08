import { Block } from '../../utils/Block';
var template = require("./FormButton.handlebars");

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
        return template(this.props);
    }
}