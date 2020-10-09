import { FormInputText, FormInputPassword, FormButton, FormLink } from '../../components/Components';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
const template = require('./Login.handlebars');

export class LoginPage extends Block {
    
    private static usernameInput: string = new FormInputText({
        name: "login",
        value: "",
        required: true,
        label: "Username"
    }).getContentAsText();

    private static passwordInput: string = new FormInputPassword({
        name: "password",
        value: "",
        label: "Password"
    }).getContentAsText();

    private static loginButton: string = new FormButton({
        text: "Log In",
        isPrimary: true
    }).getContentAsText();

    private static signupLink: string = new FormLink({
        className: "signupLink",
        text: "Need an account? Sign Up",
        href: "#signup"
    }).getContentAsText();

    constructor() {
        super("div", {
            usernameInput: LoginPage.usernameInput,
            passwordInput: LoginPage.passwordInput,
            loginButton: LoginPage.loginButton,
            signupLink: LoginPage.signupLink,
        }, { classes: ["dialog-wrapper"] });
    }

    formValidation: FormValidation;

    componentRendered(): void {
        this.formValidation = new FormValidation("form.login-dialog");
        
        this.formValidation.setValidation("login");
        this.formValidation.setValidation("password");

        const logIn = () => {
            if (!this.formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                this.formValidation.showErrors();
            } else {
                console.log('Logging in, data: ', JSON.stringify(this.formValidation.values));
            }
        }

        this.getContent().querySelector('.button-submit').addEventListener('click', logIn);
    }

    clearData() {
        this.formValidation.discardChanges();
    }
    render() {
        return template({
            usernameInput: this.props.usernameInput,
            passwordInput: this.props.passwordInput,
            loginButton: this.props.loginButton,
            signupLink: this.props.signupLink,
        });
    }
}