import { Block } from "../../utils/Block.js";
import { handlebars } from "../../utils/Handlebars.js";
import { template } from "./FormInput.tmpl.js";

export class FormInput extends Block {
    constructor(props: { name: string, value: string, required: boolean, label: string }) {

        let maybeRequired: string = props.required ? "required" : "";
        let newProps: object = {};
        Object.assign(newProps, props);
        newProps[maybeRequired] = maybeRequired;

        super("div", props, ["input-container"]);
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl(this.props);
    }
}



// handlebars().registerHelper('chat-input-text', function (name: string, label: string, value: string, required: boolean): string {
//     let html = `
//     <div class="input-container">
//         <input type="text" name="${name}" class="inputtext" placeholder=" " value="${value}" ${(required === false) ? "" : "required"} />
//         <span class="inputtext-floating-label">${label}</span>
//         <span class="error-text"></span>
//     </div>
//     `;
//     return handlebarsSafeString(html);
// });

// export const template = `
//     <div class="input-container">
//         <input type="text" name="{{name}}" class="inputtext" placeholder=" " value="{{value}}" {{maybeRequired}} />
//         <span class="inputtext-floating-label">{{label}}</span>
//         <span class="error-text"></span>
//     </div>
// `;