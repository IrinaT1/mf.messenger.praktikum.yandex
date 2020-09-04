export const loginTemplate = `
    <div class="wrapper">
        <form class="card login-dialog">
            <div class="header">
                Log in to Chats
            </div>

            {{chat-input-text-required 'login' 'Username' login}}
            {{chat-input-password 'password' 'Password' password}}

            <div style="height: 40px;"></div>

            {{chat-button 'Log In' 'primary'}}
            {{chat-link 'Need an account? Sign Up' "./signup.html"}}
        </form>
    </div>
`;