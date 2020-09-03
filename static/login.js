import {loginTemplate} from './login.tmpl.js';
import {} from './helpers.js';
import {FormValidation} from './validation.js';

const context = {
    login: "",
    password: ""
};

const template = Handlebars.compile(loginTemplate);
const root = document.querySelector(".root");

root.innerHTML = template(context);

const formSelector = "form.login-dialog";
const formValidation = new FormValidation(formSelector);

const getFormData = (formSelector) => {
    return {
        login: document.querySelector(formSelector).querySelector("[name='login']").value,
        password: document.querySelector(formSelector).querySelector("[name='password']").value
    }
}

const logIn = () => {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    } else {
        console.log('Loggin in...');
    }
    console.log("data: ", JSON.stringify(getFormData(formSelector)));
}

document.querySelector('.button-submit').addEventListener('click', logIn);

formValidation.setValidation("login");
formValidation.setValidation("password");