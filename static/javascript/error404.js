import {errorTemplate} from '../templates/error.tmpl.js';
import './helpers/helpers.js';

const context = {
    errorText: "This is not what you're looking for.",
};

const template = Handlebars.compile(errorTemplate);
const root = document.querySelector(".root");
root.innerHTML = template(context);
