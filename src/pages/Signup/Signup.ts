import { FormInputText, FormInputPassword, FormButton, FormLink, FormInputEmail } from '../../components/Components';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
const template = require('./Signup.handlebars');

const signupData = {
    email: "",
    login: "",
    display_name: "",
    password: "",
    verify_password: ""
};

export class SignupPage extends Block {
    private static emailInput: string = new FormInputEmail({
        name: "email",
        value: signupData.email,
        label: "Email"
    }).getContentAsText();

    private static usernameInput: string = new FormInputText({
        name: "login",
        value: signupData.login,
        required: true,
        label: "Username"
    }).getContentAsText();

    private static displayNameInput: string = new FormInputText({
        name: "display_name",
        value: signupData.display_name,
        required: true,
        label: "Display name"
    }).getContentAsText();

    private static passwordInput: string = new FormInputPassword({
        name: "password",
        value: signupData.password,
        label: "Password"
    }).getContentAsText();

    private static verifyPasswordInput: string = new FormInputPassword({
        name: "verify_password",
        value: signupData.verify_password,
        label: "Re-enter password"
    }).getContentAsText();

    private static saveButton: string = new FormButton({
        text: "Save",
        isPrimary: true
    }).getContentAsText();

    private static loginLink: string = new FormLink({
        text: "Already have an account? Log In",
        href: "#login"
    }).getContentAsText();

    constructor() {
        super("div", {
            emailInput: SignupPage.emailInput,
            usernameInput: SignupPage.usernameInput,
            displayNameInput: SignupPage.displayNameInput,
            passwordInput: SignupPage.passwordInput,
            verifyPasswordInput: SignupPage.verifyPasswordInput,
            saveButton: SignupPage.saveButton,
            loginLink: SignupPage.loginLink
        }, { classes: ["dialog-wrapper"] });
    }

    formValidation: FormValidation;

    componentRendered(): void {
        this.formValidation = new FormValidation("form.signup-dialog");

        this.formValidation.setValidation("email");
        this.formValidation.setValidation("login", { "Login should contain at least 4 symbols": (value) => { return value.trim().length <= 3; } });
        this.formValidation.setValidation("display_name");
        this.formValidation.setValidation("password");
        this.formValidation.setValidation("verify_password", { "Passwords should match": (value) => { return value != this.formValidation.field("password").value; } });

        const signUp = () => {
            if (!this.formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                this.formValidation.showErrors();
            }
            else {
                console.log('Signing up, data: ', JSON.stringify(this.formValidation.values));
            }
        };
        this.getContent().querySelector('.button-submit').addEventListener('click', signUp);
    }

    clearData() {
        this.formValidation.discardChanges();
    }

    render() {
        return template({
            emailInput: this.props.emailInput,
            usernameInput: this.props.usernameInput,
            displayNameInput: this.props.displayNameInput,
            passwordInput: this.props.passwordInput,
            verifyPasswordInput: this.props.verifyPasswordInput,
            saveButton: this.props.saveButton,
            loginLink: this.props.loginLink
        });
    }
}