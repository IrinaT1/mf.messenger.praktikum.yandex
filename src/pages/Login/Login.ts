import { FormInputText, FormInputPassword, FormButton, FormLink } from "../../components/Components.js";
import { Block } from "../../utils/Block.js";
import { FormValidation } from "../../utils/FormValidation.js";
import { handlebars, handlebarsSafeString } from "../../utils/Handlebars.js";
import { template } from './Login.tmpl.js';

export class LoginPage extends Block {
    constructor() {
        let usernameInput: string = handlebarsSafeString(new FormInputText({
            name: "login",
            value: "",
            required: true,
            label: "Username"
        }).getContentAsText());

        let passwordInput: string = handlebarsSafeString(new FormInputPassword({
            name: "password",
            value: "",
            label: "Password"
        }).getContentAsText());

        let loginButton: string = handlebarsSafeString(new FormButton({
            text: "Log In",
            isPrimary: true
        }).getContentAsText());

        let signupLink: string = handlebarsSafeString(new FormLink({
            text: "Need an account? Sign Up",
            href: "#"
        }).getContentAsText());

        super("div", {
            usernameInput: usernameInput,
            passwordInput: passwordInput,
            loginButton: loginButton,
            signupLink: signupLink,
        }, { classes: ["dialog-wrapper"] });
    }

    componentRendered(): void {
        let formValidation = new FormValidation("form.login-dialog");
        console.log("creating this.formValidation = ", formValidation);

        formValidation.setValidation("login");
        formValidation.setValidation("password");

        const logIn = () => {
            if (!formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                formValidation.showErrors();
            } else {
                console.log('Logging in, data: ', JSON.stringify(formValidation.values));
            }
        }

        this.getContent().querySelector('.button-submit').addEventListener('click', logIn);
    }

    render() {
        const tmpl = handlebars().compile(template);
        return tmpl({
            usernameInput: this.props.usernameInput,
            passwordInput: this.props.passwordInput,
            loginButton: this.props.loginButton,
            signupLink: this.props.signupLink,
        });
    }
}