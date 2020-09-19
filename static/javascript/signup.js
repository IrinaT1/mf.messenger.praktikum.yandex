import { signupTemplate } from '../templates/signup.tmpl.js';
import './helpers/helpers.js';
import { FormValidation } from './helpers/formValidation.js';
import { handlebars } from './helpers/handlebars.js';
var context = {
    email: "",
    login: "",
    display_name: "",
    password: "",
    verify_password: ""
};
var template = handlebars().compile(signupTemplate);
var root = document.querySelector(".root");
root.innerHTML = template(context);
var formSelector = "form.signup-dialog";
var formValidation = new FormValidation(formSelector);
var signUp = function () {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    }
    else {
        console.log('Signing up, data: ', JSON.stringify(formValidation.values));
    }
};
document.querySelector('.button-submit').addEventListener('click', signUp);
formValidation.setValidation("email");
formValidation.setValidation("login", { "Login should contain at least 4 symbols": function (value) { return value.trim().length <= 3; } });
formValidation.setValidation("display_name");
formValidation.setValidation("password");
formValidation.setValidation("verify_password", { "Passwords should match": function (value) { return value != formValidation.field("password").value; } });
//# sourceMappingURL=signup.js.map