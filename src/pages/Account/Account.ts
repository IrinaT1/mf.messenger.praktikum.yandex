import { User, UserDataType } from '../../business/User';
import { FormInputText, FormButton, FormLink, FormInputEmail } from '../../components/Components';
import { ApiServerUrl, getAuthServer, getUserServer } from '../../server/Server';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
import { router } from '../../utils/Utils';
const template = require('./Account.handlebars');

export class AccountPage extends Block {

    static currentData: UserDataType = {
        first_name: "",
        second_name: "",
        display_name: "",
        login: "",
        password: "",
        email: "",
        phone: "",
        avatar: ""
    };

    static currentElements: Record<string, Block>;

    static makeNewElements() {
        AccountPage.currentElements = {
            firstNameInputElement: new FormInputText({
                name: "first_name",
                value: AccountPage.currentData.first_name,
                required: true,
                label: "First name"
            }),
            secondNameInputElement: new FormInputText({
                name: "second_name",
                value: AccountPage.currentData.second_name,
                required: true,
                label: "Second name"
            }),
            displayNameInputElement: new FormInputText({
                name: "display_name",
                value: AccountPage.currentData.display_name,
                required: true,
                label: "Display name"
            }),
            usernameInputElement: new FormInputText({
                name: "login",
                value: AccountPage.currentData.login,
                required: true,
                label: "Username"
            }),
            emailInputElement: new FormInputEmail({
                name: "email",
                value: AccountPage.currentData.email,
                label: "Email"
            }),
            phoneInputElement: new FormInputText({
                name: "phone",
                value: AccountPage.currentData.phone,
                required: true,
                label: "Phone"
            }),
            saveButtonElement: new FormButton({
                text: "Save",
                isPrimary: true
            }),
            backLinkElement: new FormLink({
                text: "Back to Chats",
            }),
            changePasswordLinkElement: new FormLink({
                text: "Change Password",
            }), 
        };
    }

    static getProps = () => {
        return {
            display_name: AccountPage.currentData.display_name,
            avatarURL: AccountPage.currentData.avatar,
            firstNameInput: AccountPage.currentElements.firstNameInputElement.getContentAsText(),
            secondNameInput: AccountPage.currentElements.secondNameInputElement.getContentAsText(),
            displayNameInput: AccountPage.currentElements.displayNameInputElement.getContentAsText(),
            usernameInput: AccountPage.currentElements.usernameInputElement.getContentAsText(),
            emailInput: AccountPage.currentElements.emailInputElement.getContentAsText(),
            phoneInput: AccountPage.currentElements.phoneInputElement.getContentAsText(),
            saveButton: AccountPage.currentElements.saveButtonElement.getContentAsText(),
            backLink: AccountPage.currentElements.backLinkElement.getContentAsText(),
            changePasswordLink: AccountPage.currentElements.changePasswordLinkElement.getContentAsText()
        }
    }

    constructor() {
        AccountPage.makeNewElements();
        super("div", AccountPage.getProps(), { classes: ["dialog-wrapper"] });
    }

    formValidation: FormValidation;

    private _user: User;
    get user(): User {
        return this._user;
    }
    set user(user: User) {
        if (!user.data.display_name) {
            user.data.display_name = user.data.first_name + " " + user.data.second_name;
        }
        this._user = user;

        AccountPage.currentData = user.data;
        AccountPage.makeNewElements();

        this.setProps(AccountPage.getProps());
        this.setup();
    }

    componentRendered(): void {
        getAuthServer().auth().then((data) => {
            this.user = new User(JSON.parse(data.response) as UserDataType);
            console.log("User successfully obtained, user = ", this.user);
        }).catch((error) => {
            console.log("User data is not available, error = ", error);
            router.go("#login");
        });
    }

    setup() {
        this.formValidation = new FormValidation("form.account-dialog");

        this.formValidation.setValidation("email");
        this.formValidation.setValidation("login", { "Login should contain at least 4 symbols": (value) => { return value.trim().length <= 3; } });
        this.formValidation.setValidation("display_name");
        this.formValidation.setValidation("first_name");
        this.formValidation.setValidation("second_name");
        this.formValidation.setValidation("phone", { "Phone should contain only numbers and dashes": (value) => { return !(/^[\d -]+$/g).test(value.trim()) && value != ""; } });

        const saveAccount = () => {
            if (!this.formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                this.formValidation.showErrors();
            } else {
                console.log('Saving data: ', JSON.stringify(this.formValidation.values));
                const updatedUserData = this.formValidation.values as UserDataType;
                updatedUserData.id = this.user.data.id;

                getUserServer().update(updatedUserData).then((data) => {
                    console.log("user info updated successfully, data = ", data);
                    this.user = new User(JSON.parse(data.response) as UserDataType);
                    alert("Success!");
                }).catch((error) => {
                    console.log("error updating user info, error = ", error);
                    alert("Error: " + JSON.stringify(error.response));
                });
            }
        }
        this.getContent().querySelector('.button-submit').addEventListener('click', saveAccount);

        const goBack = () => {
            router.go("#chats");
        }
        document.getElementById(AccountPage.currentElements.backLinkElement.id()).addEventListener('click', goBack);

        const changePassword = () => {
            router.go("#changepassword");
        }
        document.getElementById(AccountPage.currentElements.changePasswordLinkElement.id()).addEventListener('click', changePassword);
        

        const changeAvatarInput = document.getElementById("input-avatar") as HTMLInputElement;
        changeAvatarInput.onchange = () => {
            console.log("Saving user avatar ", changeAvatarInput.value);

            const avatarFormData = new FormData();
            avatarFormData.append('avatar', changeAvatarInput.files[0]);

            console.log("avatarFormData ", avatarFormData);
            console.log("changeAvatarInput.files[0] ", changeAvatarInput.files[0]);

            getUserServer().changeAvatar(avatarFormData).then((data) => {
                console.log("Avatar changed, data = ", data);
                this.user = new User(JSON.parse(data.response) as UserDataType);
            }).catch((error) => {
                console.log("Error changing avatar, error = ", error);
                alert("Error: " + JSON.stringify(error.response));
            });
        };
    }

    clearData() {
        this.formValidation.discardChanges();
    }

    render() {
        return template({
            display_name: this.props.display_name,
            avatarURL: this.props.avatarURL,
            firstNameInput: this.props.firstNameInput,
            secondNameInput: this.props.secondNameInput,
            phoneInput: this.props.phoneInput,
            displayNameInput: this.props.displayNameInput,
            usernameInput: this.props.usernameInput,
            emailInput: this.props.emailInput,
            saveButton: this.props.saveButton,
            backLink: this.props.backLink,
            changePasswordLink: this.props.changePasswordLink
        });
    }
}
