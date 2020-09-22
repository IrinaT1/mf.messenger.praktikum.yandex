import { Button } from "../../components/Button/Button.js";
//import { Button } from '/Users/irina/Projects/yandex/mf.messenger.praktikum.yandex/src/components/Button/Button.js'
import { Block } from "../../utils/Block.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";

// Хорошая практика перенести шаблон в template.js. Это позволит 
// не захламлять файл с компонентой и соблюдать консистентность.
const template = `
<div>
    {{ button }}
    {{ userName }}
</div>
`;

export class TestPage extends Block {
    constructor() {
        super("block", {
            name: "Login 1",
            button: handlebarsSafeString(new Button({
                className: "className",
                child: "Text 2"
            }).getContent().outerHTML)
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
            button: this.props.button
        });
    }
}