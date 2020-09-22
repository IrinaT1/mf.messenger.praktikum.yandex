import { errorTemplate } from '../templates/error.tmpl.js';
import './helpers/helpers.js';
import { handlebars } from './helpers/handlebars.js';
var context = {
    errorText: "Unexpected error.",
};
var template = handlebars().compile(errorTemplate);
var root = document.querySelector(".root");
root.innerHTML = template(context);
//# sourceMappingURL=error500.js.map