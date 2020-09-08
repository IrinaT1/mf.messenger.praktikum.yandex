import {signupTemplate} from '../templates/signup.tmpl.js';
import './helpers/helpers.js';
import {FormValidation} from './helpers/validation.js';

const context = {
    email: "",
    login: "",
    display_name: "",
    password: "",
    verify_password: ""
};

const template = Handlebars.compile(signupTemplate);
const root = document.querySelector(".root");

root.innerHTML = template(context);

const formSelector = "form.signup-dialog";
const formValidation = new FormValidation(formSelector);

const signUp = () => {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    } else {
        console.log('Signing up, data: ', JSON.stringify(formValidation.values));
    }
} 

document.querySelector('.button-submit').addEventListener('click', signUp);

formValidation.setValidation("email");
formValidation.setValidation("login", {"Login should contain at least 4 symbols": (value) => value.trim().length <= 3});
formValidation.setValidation("display_name");
formValidation.setValidation("password");
formValidation.setValidation("verify_password", {"Passwords should match": (value) => value != formValidation.field("password").value});