export const accountTemplate = `
    <div class="wrapper">
        <form class="card account-dialog">
            <div class="header">
                Hi, {{display_name}}!
            </div>

            <div class="account-picture" style="background-image: url('{{avatar}}')">s
                <div class="change-account-picture">Change</div>
            </div>

            {{!chat-input-text 'first_name' 'First name' 'Irina'}}
            {{!chat-input-text 'last_name' 'Last name' 'Tishchenko'}}

            {{chat-input-text-required 'display_name' 'Display name' display_name}}
            {{chat-input-text-required 'login' 'Login' login}}
            {{chat-input-email 'email' 'Email' email}}

            {{!chat-input-password 'password' 'Password' 'test'}}
            {{!chat-input-password 'confirm_password' 'Re-enter password' 'test'}}

            <div style="height: 40px;"></div>

            {{chat-button 'Save' 'primary'}}
            {{chat-link 'Back to Chats' "#"}}
        </form>
    </div>
`;