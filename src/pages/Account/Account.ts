import { User, UserDataType } from '../../business/User';
import { FormInputText, FormButton, FormLink, FormInputEmail } from '../../components/Components';
import { getAuthServer } from '../../server/Server';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
import { router } from '../../utils/Utils';
const template = require('./Account.handlebars');

export class AccountPage extends Block {

    static currentData: UserDataType = {
        first_name: "",
        second_name: "",
        display_name: "",
        login: "",
        password: "",
        email: "",
        phone: "",
        avatar: ""
    };

    static currentElements: Record<string, Block>;

    static makeNewElements() {
        AccountPage.currentElements = {
            displayNameInputElement: new FormInputText({
                name: "display_name",
                value: AccountPage.currentData.display_name,
                required: true,
                label: "Display name"
            }),
            usernameInputElement: new FormInputText({
                name: "login",
                value: AccountPage.currentData.login,
                required: true,
                label: "Username"
            }),
            emailInputElement: new FormInputEmail({
                name: "email",
                value: AccountPage.currentData.email,
                label: "Email"
            }),
            saveButtonElement: new FormButton({
                text: "Save",
                isPrimary: true
            }),
            backLinkElement: new FormLink({
                text: "Back to Chats",
            })
        };
    }

    static getProps = () => {
        return {
            display_name: AccountPage.currentData.display_name,
            avatarURL: AccountPage.currentData.avatar,
            displayNameInput: AccountPage.currentElements.displayNameInputElement.getContentAsText(),
            usernameInput: AccountPage.currentElements.usernameInputElement.getContentAsText(),
            emailInput: AccountPage.currentElements.emailInputElement.getContentAsText(),
            saveButton: AccountPage.currentElements.saveButtonElement.getContentAsText(),
            backLink: AccountPage.currentElements.backLinkElement.getContentAsText()
        }
    }

    constructor() {
        AccountPage.makeNewElements();
        super("div", AccountPage.getProps(), { classes: ["dialog-wrapper"] });
    }

    formValidation: FormValidation;
    user: User;

    componentRendered(): void {

        getAuthServer().auth().then((data) => {
            this.user = new User(JSON.parse(data.response) as UserDataType);
            console.log("User successfully obtained, user = ", this.user);

            AccountPage.currentData = this.user.data;
            AccountPage.makeNewElements();

            this.setProps(AccountPage.getProps());
            this.setup();

        }).catch((error) => {
            console.log("User data is not available, error = ", error);
            router.go("#login");
        });
    }

    setup() {
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
        document.getElementById(AccountPage.currentElements.backLinkElement.id()).addEventListener('click', goBack);       
    }

    clearData() {
        this.formValidation.discardChanges();
    }

    render() {
        return template({
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
