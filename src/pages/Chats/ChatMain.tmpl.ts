export const template = `
    <section class="section-side">
        <header class="section-side-header">
            <h1 class="chats-title">Chats</h1>
        </header>
        <ul class="chatlist chatlist-root">
            <div class="chatlist-loader loader"></div>
        </ul>
    </section>
    <main class="section-main">
        <header class="section-main-header">
            <div class="chatdetail-chatinfo">
                <h2 class="chatdetail-chatinfo-name chatdetail-name-root">
                    {{chatdetailsName}}
                </h2>
            </div>
        </header>
        <section class="chatdetail-messages chatdetail-messages-root">
            {{chatdetailsMessages}}
        </section>
        <form class="chatdetail-newmessage">
            <input type="text" class="chatdetail-newmessage-input" name="message" placeholder="Send something..."></input>
            <button class="chatdetail-newmessage-send" type="button">
                <i class="material-icons">send</i>
            </button>
        </form>
    </main>
`;



// {{#each chats}}
// {{chatItem}}
// {{/each}}