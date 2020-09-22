export function handlebars() {
    // @ts-ignore
    return Handlebars;
}

export function handlebarsSafeString(html: string): string {
    // @ts-ignore
    return new Handlebars.SafeString(html);
}