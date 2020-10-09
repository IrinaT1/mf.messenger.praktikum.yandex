import { FormLink } from '../../components/Components';
import { Block } from '../../utils/Block';
import { router } from '../../utils/Utils';
const template = require('./Error.handlebars');

export class GenericErrorPage extends Block {

    private static elements = {
        backLinkElement: new FormLink({
            text: "Back to Chats",
        })
    }

    constructor(errorText: string) {
        super("div", {
            errorText: errorText,
            backLink: GenericErrorPage.elements.backLinkElement.getContentAsText()
        }, { classes: ["error-wrapper"] });
    }

    componentRendered(): void {
        const goBack = () => {
            router.go("#chats");
        }
        document.getElementById(GenericErrorPage.elements.backLinkElement.id()).addEventListener('click', goBack);
    }

    render() {
        return template({
            errorText: this.props.errorText,
            backLink: this.props.backLink
        });
    }
}