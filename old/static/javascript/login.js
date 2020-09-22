import { loginTemplate } from '../templates/login.tmpl.js';
import './helpers/helpers.js';
import { FormValidation } from './helpers/formValidation.js';
import { handlebars } from './helpers/handlebars.js';
var context = {
    login: "",
    password: ""
};
var template = handlebars().compile(loginTemplate);
var root = document.querySelector(".root");
root.innerHTML = template(context);
var formValidation = new FormValidation("form.login-dialog");
var logIn = function () {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    }
    else {
        console.log('Logging in, data: ', JSON.stringify(formValidation.values));
    }
};
document.querySelector('.button-submit').addEventListener('click', logIn);
formValidation.setValidation("login");
formValidation.setValidation("password");
//# sourceMappingURL=login.js.map