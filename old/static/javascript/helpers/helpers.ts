import {handlebars, handlebarsSafeString} from './handlebars.js';

handlebars().registerHelper('chat-button', function(text: string, type: string): string {
    let className = type === "primary" ? "primary" : "secondary";
    let html = `<button class="button-submit ${className}" type="button">${text}</button>`;
    return handlebarsSafeString(html);
});

//TODO: обёртку вокруг инпута вынести в отдельный шаблон, потому что он повторяется в каждом хэлпере с инпутом

handlebars().registerHelper('chat-input-text', function(name: string, label: string, value: string, required: boolean): string {
    let html = `
    <div class="input-container">
        <input type="text" name="${name}" class="inputtext" placeholder=" " value="${value}" ${ (required === false) ? "" : "required"} />
        <span class="inputtext-floating-label">${label}</span>
        <span class="error-text"></span>
    </div>
    `;
    return handlebarsSafeString(html);
});

handlebars().registerHelper('chat-input-email', function(name: string, label: string, value: string): string {
    let html = `
    <div class="input-container">
        <input type="email" name="${name}" class="inputtext" placeholder=" " value="${value}" required />
        <span class="inputtext-floating-label">${label}</span>
        <span class="error-text"></span>
    </div>
    `;
    return handlebarsSafeString(html);
});

handlebars().registerHelper('chat-input-password', function(name: string, label: string, value: string): string {
    let html = `
    <div class="input-container">
        <input type="password" name="${name}" class="inputtext" placeholder=" " value="${value}" required />
        <span class="inputtext-floating-label">${label}</span>
        <span class="error-text"></span>
    </div>
    `;
    return handlebarsSafeString(html);
});

handlebars().registerHelper('chat-link', function(text: string, href: string): string {
    let html = `<a href="${href}" class="link-back">${text}</a>`;
    return handlebarsSafeString(html);
});