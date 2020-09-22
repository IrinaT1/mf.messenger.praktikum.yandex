import { accountTemplate } from '../templates/account.tmpl.js';
import './helpers/helpers.js';
import { FormValidation } from './helpers/formValidation.js';
import { handlebars } from './helpers/handlebars.js';
var context = {
    display_name: "IrinaT",
    login: "Irina2345",
    email: "irin.tishchenko@gmail.com",
    avatar: "https://picsum.photos/300"
};
var template = handlebars().compile(accountTemplate);
var root = document.querySelector(".root");
root.innerHTML = template(context);
var formValidation = new FormValidation("form.account-dialog");
var saveAccount = function () {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    }
    else {
        console.log('Saving data: ', JSON.stringify(formValidation.values));
    }
};
document.querySelector('.button-submit').addEventListener('click', saveAccount);
formValidation.setValidation("login");
formValidation.setValidation("display_name");
formValidation.setValidation("email");
//# sourceMappingURL=account.js.map