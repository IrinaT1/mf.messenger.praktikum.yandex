export const template = `
    <form class="card account-dialog">
        <div class="header">
            Hi, {{display_name}}!
        </div>

        <div class="account-picture" style="background-image: url('{{avatarURL}}')">
            <div class="change-account-picture">Change</div>
        </div>
        
        {{displayNameInput}}
        {{usernameInput}}
        {{emailInput}}

        <div style="height: 40px;"></div>

        {{saveButton}}
        {{backLink}}

    </form>
`;