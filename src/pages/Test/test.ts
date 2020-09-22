import { Button, FormInputText, FormInputEmail, FormButton, FormLink } from "../../components/Components.js";
import { Block } from "../../utils/Block.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";

// Хорошая практика перенести шаблон в template.js. Это позволит 
// не захламлять файл с компонентой и соблюдать консистентность.
const template = `
<div>
    {{ button }}
    {{ userName }}
    <div class="input">{{ inputText }}</div>
    <div class="input">{{ inputEmail }}</div>
    <div class="button">{{ button1 }}</div>
    {{ link }}
</div>
`;

export class TestPage extends Block {

    constructor() {
        let button: string = handlebarsSafeString(new Button({
            className: "className",
            child: "Text 2"
        }).getContentAsText());

        let inputText: string = handlebarsSafeString(new FormInputText({
            name: "name",
            value: "Hello",
            required: true,
            label: "Label"
        }).getContentAsText());

        let inputEmail: string = handlebarsSafeString(new FormInputEmail({
            name: "email",
            value: "Hello",
            label: "Email"
        }).getContentAsText());

        let button1: string = handlebarsSafeString(new FormButton({
            text: "Click me",
            isPrimary: true
        }).getContentAsText());

        let link: string = handlebarsSafeString(new FormLink({
            text: "Go back",
            href: "#"
        }).getContentAsText());

        super("block", {
            name: "Login 1",
            button: button,
            inputText: inputText,
            inputEmail: inputEmail,
            button1: button1,
            link: link
        });
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            userName: this.props.name,
            button: this.props.button,
            inputText: this.props.inputText,
            inputEmail: this.props.inputEmail,
            button1: this.props.button1,
            link: this.props.link
        });
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setProps({
        //         name: "Login 3",
        //     });
        // }, 5000);
    }
}