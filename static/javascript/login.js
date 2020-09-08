import {loginTemplate} from '../templates/login.tmpl.js';
import './helpers/helpers.js';
import {FormValidation} from './helpers/validation.js';

const context = {
    login: "",
    password: ""
};

const template = Handlebars.compile(loginTemplate);
const root = document.querySelector(".root");

root.innerHTML = template(context);

const formValidation = new FormValidation("form.login-dialog");

const logIn = () => {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    } else {
        console.log('Loggin in, data: ', JSON.stringify({"value": value}));
    }
}

document.querySelector('.button-submit').addEventListener('click', logIn);

formValidation.setValidation("login");
formValidation.setValidation("password");