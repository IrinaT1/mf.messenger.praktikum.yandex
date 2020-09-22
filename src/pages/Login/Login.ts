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