import {loginTemplate} from '../templates/login.tmpl.js';
import './helpers/helpers.js';
import {FormValidation} from './helpers/formValidation.js';
import {handlebars} from './helpers/handlebars.js';

const context = {
    login: "",
    password: ""
};

const template = handlebars().compile(loginTemplate);
const root = document.querySelector(".root");

root.innerHTML = template(context);

const formValidation = new FormValidation("form.login-dialog");

const logIn = () => {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    } else {
        console.log('Logging in, data: ', JSON.stringify(formValidation.values));
    }
}

document.querySelector('.button-submit').addEventListener('click', logIn);

formValidation.setValidation("login");
formValidation.setValidation("password");