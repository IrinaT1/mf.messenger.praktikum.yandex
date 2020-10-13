import { User, UserDataType } from '../../business/User';
import { FormInputText, FormInputPassword, FormButton, FormLink, FormInputEmail } from '../../components/Components';
import { getAuthServer } from '../../server/Server';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
import { router } from '../../utils/Utils';
const template = require('./Signup.handlebars');

const signupData = {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    phone: "",
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

    private static firstNameInput: string = new FormInputText({
        name: "first_name",
        value: signupData.first_name,
        required: true,
        label: "First name"
    }).getContentAsText();

    private static secondNameInput: string = new FormInputText({
        name: "second_name",
        value: signupData.second_name,
        required: true,
        label: "Second name"
    }).getContentAsText();

    private static phoneInput: string = new FormInputText({
        name: "phone",
        value: signupData.phone,
        required: true,
        label: "Phone"
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
            firstNameInput: SignupPage.firstNameInput,
            secondNameInput: SignupPage.secondNameInput,
            phoneInput: SignupPage.phoneInput,
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
        this.formValidation.setValidation("first_name");
        this.formValidation.setValidation("second_name");
        this.formValidation.setValidation("phone", { "Phone should contain only numbers and dashes": (value) => { return !(/^[\d -]+$/g).test(value.trim()) && value != ""; } });
        this.formValidation.setValidation("password");
        this.formValidation.setValidation("verify_password", { "Passwords should match": (value) => { return value != this.formValidation.field("password").value; } });

        const signUp = () => {
            if (!this.formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                this.formValidation.showErrors();
            }
            else {
                console.log('Signing up, data: ', JSON.stringify(this.formValidation.values));
                const user = new User(this.formValidation.values as UserDataType);

                getAuthServer().signup(user).then((data) => {
                    console.log("Successful sign up, response is ", data);

                    getAuthServer().logout().then((data) => {
                        console.log("signing out previous user, data = ", data);
                    }).catch((error) => {
                        console.log("signing out previous user failed, error = ", error);
                    }).finally(() => {
                        getAuthServer().signin(user.data.login, user.data.password).then((data) => {
                            console.log("Successful sign in, response is ", data);
                            router.go("#chats");

                        }).catch((error) => {
                            console.log("Sign in error: ", error);
                            alert(JSON.parse(error.response).reason ?? "Error");
                        });
                    });

                }).catch((error) => {
                    console.log("Sign up error: ", error);
                    alert(JSON.parse(error.response).reason ?? "Error");
                });
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
            firstNameInput: this.props.firstNameInput,
            secondNameInput: this.props.secondNameInput,
            phoneInput: this.props.phoneInput,
            passwordInput: this.props.passwordInput,
            verifyPasswordInput: this.props.verifyPasswordInput,
            saveButton: this.props.saveButton,
            loginLink: this.props.loginLink
        });
    }
}
