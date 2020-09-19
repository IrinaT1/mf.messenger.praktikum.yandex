import { handlebars, handlebarsSafeString } from './handlebars.js';
handlebars().registerHelper('chat-button', function (text, type) {
    var className = type === "primary" ? "primary" : "secondary";
    var html = "<button class=\"button-submit " + className + "\" type=\"button\">" + text + "</button>";
    return handlebarsSafeString(html);
});
//TODO: обёртку вокруг инпута вынести в отдельный шаблон, потому что он повторяется в каждом хэлпере с инпутом
handlebars().registerHelper('chat-input-text', function (name, label, value, required) {
    var html = "\n    <div class=\"input-container\">\n        <input type=\"text\" name=\"" + name + "\" class=\"inputtext\" placeholder=\" \" value=\"" + value + "\" " + ((required === false) ? "" : "required") + " />\n        <span class=\"inputtext-floating-label\">" + label + "</span>\n        <span class=\"error-text\"></span>\n    </div>\n    ";
    return handlebarsSafeString(html);
});
handlebars().registerHelper('chat-input-email', function (name, label, value) {
    var html = "\n    <div class=\"input-container\">\n        <input type=\"email\" name=\"" + name + "\" class=\"inputtext\" placeholder=\" \" value=\"" + value + "\" required />\n        <span class=\"inputtext-floating-label\">" + label + "</span>\n        <span class=\"error-text\"></span>\n    </div>\n    ";
    return handlebarsSafeString(html);
});
handlebars().registerHelper('chat-input-password', function (name, label, value) {
    var html = "\n    <div class=\"input-container\">\n        <input type=\"password\" name=\"" + name + "\" class=\"inputtext\" placeholder=\" \" value=\"" + value + "\" required />\n        <span class=\"inputtext-floating-label\">" + label + "</span>\n        <span class=\"error-text\"></span>\n    </div>\n    ";
    return handlebarsSafeString(html);
});
handlebars().registerHelper('chat-link', function (text, href) {
    var html = "<a href=\"" + href + "\" class=\"link-back\">" + text + "</a>";
    return handlebarsSafeString(html);
});
//# sourceMappingURL=helpers.js.map