import { FormLink } from '../../components/Components';
import { Block } from '../../utils/Block';
import { handlebars, handlebarsSafeString } from '../../utils/Handlebars';
import { router } from '../../utils/Utils';
import { template } from './Error.tmpl';

class GenericErrorPage extends Block {

    constructor(errorText: string, private elements = {
        backLinkElement: new FormLink({
            text: "Back to Chats",
        })
    }) {
        super("div", {
            errorText: errorText,
            backLink: handlebarsSafeString(elements.backLinkElement.getContentAsText())
        }, { classes: ["error-wrapper"] });
    }

    componentRendered(): void {
        const goBack = () => {
            router.go("#chats");
        }
        document.getElementById(this.elements.backLinkElement.id()).addEventListener('click', goBack);
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            errorText: this.props.errorText,
            backLink: this.props.backLink
        });
    }
}

export class ErrorPage404 extends GenericErrorPage {
    constructor() {
        super("This is not what you're looking for.");
    }
}

export class ErrorPage500 extends GenericErrorPage {
    constructor() {
        super("Unexpected error.");
    }
}