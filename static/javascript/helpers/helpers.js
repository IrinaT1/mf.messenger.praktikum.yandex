Handlebars.registerHelper('chat-button', function(text, type) {
    let className = type === "primary" ? "primary" : "secondary";
    let html = `<button class="button-submit ${className}" type="button">${text}</button>`;
    return new Handlebars.SafeString(html);
});

//TODO: обёртку вокруг инпута вынести в отдельный шаблон, потому что он повторяется в каждом хэлпере с инпутом

Handlebars.registerHelper('chat-input-text', function(name, label, value, required) {
    let html = `
    <div class="input-container">
        <input type="text" name="${name}" class="inputtext" placeholder=" " value="${value}" ${ (required === false) ? "" : "required"} />
        <span class="inputtext-floating-label">${label}</span>
        <span class="error-text"></span>
    </div>
    `;
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('chat-input-email', function(name, label, value) {
    let html = `
    <div class="input-container">
        <input type="email" name="${name}" class="inputtext" placeholder=" " value="${value}" required />
        <span class="inputtext-floating-label">${label}</span>
        <span class="error-text"></span>
    </div>
    `;
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('chat-input-password', function(name, label, value) {
    let html = `
    <div class="input-container">
        <input type="password" name="${name}" class="inputtext" placeholder=" " value="${value}" required />
        <span class="inputtext-floating-label">${label}</span>
        <span class="error-text"></span>
    </div>
    `;
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('chat-link', function(text, href) {
    let html = `<a href="${href}" class="link-back">${text}</a>`;
    return new Handlebars.SafeString(html);
});