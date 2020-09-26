import { FormLink } from '../../components/Components';
import { Block } from '../../utils/Block';
import { handlebars, handlebarsSafeString } from '../../utils/Handlebars';
import { router } from '../../utils/Utils';
import { template } from './Error.tmpl';

export class GenericErrorPage extends Block {

    private static elements = {
        backLinkElement: new FormLink({
            text: "Back to Chats",
        })
    }

    constructor(errorText: string) {
        super("div", {
            errorText: errorText,
            backLink: handlebarsSafeString(GenericErrorPage.elements.backLinkElement.getContentAsText())
        }, { classes: ["error-wrapper"] });
    }

    componentRendered(): void {
        const goBack = () => {
            router.go("#chats");
        }
        document.getElementById(GenericErrorPage.elements.backLinkElement.id()).addEventListener('click', goBack);
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            errorText: this.props.errorText,
            backLink: this.props.backLink
        });
    }
}