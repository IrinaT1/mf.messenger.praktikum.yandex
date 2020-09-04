import {accountTemplate} from './account.tmpl.js';
import {} from './helpers.js';
import {FormValidation} from './validation.js';

const context = {
    display_name: "IrinaT",
    login: "Irina2345",
    email: "irin.tishchenko@gmail.com",
    avatar: "https://picsum.photos/300"
};

const template = Handlebars.compile(accountTemplate);
const root = document.querySelector(".root");

root.innerHTML = template(context);

const formValidation = new FormValidation("form.account-dialog");

const saveAccount = () => {
    if (!formValidation.checkFormValidity()) {
        console.log("Form is invalid");
        formValidation.showErrors();
    } else {
        console.log('Saving...');
    }
    console.log("data: ", JSON.stringify(formValidation.values));
}

document.querySelector('.button-submit').addEventListener('click', saveAccount);

formValidation.setValidation("login");
formValidation.setValidation("display_name");
formValidation.setValidation("email");