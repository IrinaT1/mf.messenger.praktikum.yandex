import {errorTemplate} from './error.tmpl.js';
import {} from './helpers.js';

const context = {
    errorText: "Unexpected error.",
};

const template = Handlebars.compile(errorTemplate);
const root = document.querySelector(".root");
root.innerHTML = template(context);