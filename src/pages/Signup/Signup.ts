import { FormInputText, FormInputPassword, FormButton, FormLink, FormInputEmail } from '../../components/Components';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
import { handlebars, handlebarsSafeString } from '../../utils/Handlebars';
import { template } from './Signup.tmpl';

let signupData = {
    email: "",
    login: "",
    display_name: "",
    password: "",
    verify_password: ""
};

export class SignupPage extends Block {
    constructor() {
        let emailInput: string = handlebarsSafeString(new FormInputEmail({
            name: "email",
            value: signupData.email,
            label: "Email"
        }).getContentAsText());

        let usernameInput: string = handlebarsSafeString(new FormInputText({
            name: "login",
            value: signupData.login,
            required: true,
            label: "Username"
        }).getContentAsText());

        let displayNameInput: string = handlebarsSafeString(new FormInputText({
            name: "display_name",
            value: signupData.display_name,
            required: true,
            label: "Display name"
        }).getContentAsText());

        let passwordInput: string = handlebarsSafeString(new FormInputPassword({
            name: "password",
            value: signupData.password,
            label: "Password"
        }).getContentAsText());

        let verifyPasswordInput: string = handlebarsSafeString(new FormInputPassword({
            name: "verify_password",
            value: signupData.verify_password,
            label: "Re-enter password"
        }).getContentAsText());

        let saveButton: string = handlebarsSafeString(new FormButton({
            text: "Save",
            isPrimary: true
        }).getContentAsText());

        let loginLink: string = handlebarsSafeString(new FormLink({
            text: "Already have an account? Log In",
            href: "#login"
        }).getContentAsText());

        super("div", {
            emailInput: emailInput,
            usernameInput: usernameInput,
            displayNameInput: displayNameInput,
            passwordInput: passwordInput,
            verifyPasswordInput: verifyPasswordInput,
            saveButton: saveButton,
            loginLink: loginLink
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

        var signUp = () => {
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
        const tmpl = handlebars().compile(template);
        return tmpl({
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