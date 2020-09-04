export const signupTemplate = `
    <div class="wrapper">
        <form class="card signup-dialog">
            <div class="header">
                Create account
            </div>

            {{chat-input-email 'email' 'Email' email}}
            {{chat-input-text-required 'login' 'Username' login}}
            {{chat-input-text-required 'display_name' 'Display name' display_name}}
            {{chat-input-password 'password' 'Password' password}}
            {{chat-input-password 'verify_password' 'Re-enter password' password}}

            <div style="height: 40px;"></div>

            {{chat-button 'Save' 'primary'}}
            {{chat-link 'Already have an account? Log In' "./login.html"}}
        </form>
    </div>
`;