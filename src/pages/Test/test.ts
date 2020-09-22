import { Button, FormInput } from "../../components/Components.js";
import { Block } from "../../utils/Block.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";

// Хорошая практика перенести шаблон в template.js. Это позволит 
// не захламлять файл с компонентой и соблюдать консистентность.
const template = `
<div>
    {{ button }}
    {{ userName }}
    <div class="input">{{ input }}</div>
</div>
`;

export class TestPage extends Block {

    constructor() {
        let button: string = handlebarsSafeString(new Button({
            className: "className",
            child: "Text 2"
        }).getContentAsText());

        let input: string = handlebarsSafeString(new FormInput({
            name: "name",
            value: "Hello",
            required: true,
            label: "Label"
        }).getContentAsText());

        super("block", {
            name: "Login 1",
            button: button,
            input: input
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setProps({
                name: "Login 3",
            });
        }, 5000);
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            userName: this.props.name,
            button: this.props.button,
            input: this.props.input
        });
    }
}