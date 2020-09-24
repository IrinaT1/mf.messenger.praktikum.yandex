export const template = `
    <figure class="chatlist-item-img" style="background-image: url('{{avatarURL}}')">
    </figure>

    <section class="chatlist-item-details-container">
        <h3 class="chatlist-item-name">
            {{display_name}}
        </h3>
        <div class="chatlist-item-last-message">
            {{#if last_message.incoming }}You: {{/if}} {{last_message.text}}
        </div>
        <div class="chatlist-item-last-message-time">
            {{last_message.datetime_text}}
        </div>
    </section>
`;