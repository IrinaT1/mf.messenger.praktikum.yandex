export const template = `
    <form class="card signup-dialog">
        <div class="header">
            Create account
        </div>

        {{emailInput}}
        {{usernameInput}}
        {{displayNameInput}}
        {{passwordInput}}
        {{verifyPasswordInput}}

        <div style="height: 40px;"></div>

        {{saveButton}}
        {{loginLink}}

    </form>
`;
