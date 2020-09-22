import { errorTemplate } from '../templates/error.tmpl.js';
import './helpers/helpers.js';
import { handlebars } from './helpers/handlebars.js';
var context = {
    errorText: "This is not what you're looking for.",
};
var template = handlebars().compile(errorTemplate);
var root = document.querySelector(".root");
root.innerHTML = template(context);
//# sourceMappingURL=error404.js.map