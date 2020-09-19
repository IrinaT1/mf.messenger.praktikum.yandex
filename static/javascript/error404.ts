import {errorTemplate} from '../templates/error.tmpl.js';
import './helpers/helpers.js';
import {handlebars} from './helpers/handlebars.js';

const context = {
    errorText: "This is not what you're looking for.",
};

const template = handlebars().compile(errorTemplate);
const root = document.querySelector(".root");
root.innerHTML = template(context);
