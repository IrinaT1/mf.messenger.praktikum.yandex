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
            <div class="chatdetail-chatinfo chathead-root">
            </div>
            <div class="chathead-no-chat-selected">Please select contact to start messaging</div>
        </header>
        <section class="chatdetail-messages chatdetail-messages-root">
            
        </section>
        <form class="chatdetail-newmessage" onsubmit="return false;">
            <input type="text" class="chatdetail-newmessage-input" name="message" placeholder="Send something..."></input>
            <button class="chatdetail-newmessage-send">
                <i class="material-icons">send</i>
            </button>
        </form>
    </main>
`;