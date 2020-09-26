import { FormInputText, FormButton, FormLink, FormInputEmail } from '../../components/Components';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
import { handlebars, handlebarsSafeString } from '../../utils/Handlebars';
import { router } from '../../utils/Utils';
import { template } from './Account.tmpl';

let accountData = {
    display_name: "IrinaT",
    login: "Irina2345",
    email: "irin.tishchenko@gmail.com",
    avatar: "https://picsum.photos/300"
};



export class AccountPage extends Block {

    private static elements = {
        displayNameInputElement: new FormInputText({
            name: "display_name",
            value: accountData.display_name,
            required: true,
            label: "Display name"
        }),
        usernameInputElement: new FormInputText({
            name: "login",
            value: accountData.login,
            required: true,
            label: "Username"
        }),
        emailInputElement: new FormInputEmail({
            name: "email",
            value: accountData.email,
            label: "Email"
        }),
        saveButtonElement: new FormButton({
            text: "Save",
            isPrimary: true
        }),
        backLinkElement: new FormLink({
            text: "Back to Chats",
        })
    }

    constructor() {
        super("div", {
            display_name: accountData.display_name,
            avatarURL: accountData.avatar,
            displayNameInput: handlebarsSafeString(AccountPage.elements.displayNameInputElement.getContentAsText()),
            usernameInput: handlebarsSafeString(AccountPage.elements.usernameInputElement.getContentAsText()),
            emailInput: handlebarsSafeString(AccountPage.elements.emailInputElement.getContentAsText()),
            saveButton: handlebarsSafeString(AccountPage.elements.saveButtonElement.getContentAsText()),
            backLink: handlebarsSafeString(AccountPage.elements.backLinkElement.getContentAsText())
        }, { classes: ["dialog-wrapper"] });
    }

    formValidation: FormValidation;

    componentRendered(): void {
        this.formValidation = new FormValidation("form.account-dialog");

        this.formValidation.setValidation("email");
        this.formValidation.setValidation("login", { "Login should contain at least 4 symbols": (value) => { return value.trim().length <= 3; } });
        this.formValidation.setValidation("display_name");

        const saveAccount = () => {
            if (!this.formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                this.formValidation.showErrors();
            } else {
                console.log('Saving data: ', JSON.stringify(this.formValidation.values));
            }
        }
        this.getContent().querySelector('.button-submit').addEventListener('click', saveAccount);

        const goBack = () => {
            router.go("#chats");
        }
        document.getElementById(AccountPage.elements.backLinkElement.id()).addEventListener('click', goBack);
    }

    clearData() {
        this.formValidation.discardChanges();
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            display_name: this.props.display_name,
            avatarURL: this.props.avatarURL,
            displayNameInput: this.props.displayNameInput,
            usernameInput: this.props.usernameInput,
            emailInput: this.props.emailInput,
            saveButton: this.props.saveButton,
            backLink: this.props.backLink
        });
    }
}