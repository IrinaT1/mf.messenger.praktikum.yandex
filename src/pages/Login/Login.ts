import { FormInputText, FormInputPassword, FormButton, FormLink } from "../../components/Components.js";
import { Block } from "../../utils/Block.js";
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

        super("block", {
            usernameInput: usernameInput,
            passwordInput: passwordInput,
            loginButton: loginButton,
            signupLink: signupLink,
        });
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setProps({
        //         name: "Login 3",
        //     });
        // }, 5000);
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

// usernameInput {{chat-input-text 'login' 'Username' login}}
// passwordInput {{chat-input-password 'password' 'Password' password}}
// loginButton {{chat-button 'Log In' 'primary'}}
// signupLink {{chat-link 'Need an account? Sign Up' "./signup.html"}}












// import { loginTemplate } from './login.tmpl.js';
// // import './helpers/helpers.js';
// import { FormValidation } from '../../utils/formValidation.js';
// import { handlebars } from '../../utils/Handlebars.js';
// import { Block } from '../../utils/Block.js';

// export class Login extends Block {
//     constructor() {
//         let props = {
//             login: "",
//             password: ""
//         };

//         super("div", props);
//     }

//     componentDidMount() {
//         setTimeout(() => {
//             this.setProps({
//                 name: "Login 3",
//                 password: "HAAAAA",
//             });
//         }, 5000);
//     }

//     render() {



//         return compile(template, {
//             userName: this.props.name,
//             button: this.props.button.render()
//         });
//     }
// }

// const context = {
//     login: "",
//     password: ""
// };

// const template = handlebars().compile(loginTemplate);
// const root = document.querySelector(".root");

// root.innerHTML = template(context);

// const formValidation = new FormValidation("form.login-dialog");

// const logIn = () => {
//     if (!formValidation.checkFormValidity()) {
//         console.log("Form is invalid");
//         formValidation.showErrors();
//     } else {
//         console.log('Logging in, data: ', JSON.stringify(formValidation.values));
//     }
// }

// document.querySelector('.button-submit').addEventListener('click', logIn);

// formValidation.setValidation("login");
// formValidation.setValidation("password");