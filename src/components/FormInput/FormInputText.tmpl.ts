export const template = `
    <input type="text" name="{{name}}" class="inputtext" placeholder=" " value="{{value}}" {{maybeRequired}} />
    <span class="inputtext-floating-label">{{label}}</span>
    <span class="error-text"></span>
`;