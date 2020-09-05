export const chatlistTemplate = `
    {{#each chats}}
        <li class="chatlist-item {{#if this.selected}}selected{{/if}}">
        <figure class="chatlist-item-img" style="background-image: url('{{this.avatar}}')">
        </figure>

        <section class="chatlist-item-details-container">
            <h3 class="chatlist-item-name">
                {{this.display_name}}
            </h3>
            <div class="chatlist-item-last-message">
                {{#if this.last_message.incoming }}You: {{/if}} {{this.last_message.text}}
            </div>
            <div class="chatlist-item-last-message-time">
                {{this.last_message.datetime_text}}
            </div>
        </section>
        </li>
    {{/each}}
`;

export const chatdetailsNameTemplate = `
    {{display_name}}
`;

export const chatdetailsMessagesTemplate = `
    {{#each messages}}
        <article class="chatdetail-messages-message {{#if this.incoming}}incoming{{else}}outcoming{{/if}}">
            <img src="{{this.url}}"></img>
            {{this.text}}
        </article>
    {{/each}}
`;