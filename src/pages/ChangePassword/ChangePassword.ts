import { User, UserDataType } from '../../business/User';
import { FormInputPassword, FormButton, FormLink } from '../../components/Components';
import { getAuthServer, getUserServer } from '../../server/Server';
import { Block } from '../../utils/Block';
import { FormValidation } from '../../utils/FormValidation';
import { router } from '../../utils/Utils';
const template = require('./ChangePassword.handlebars');

export class ChangePasswordPage extends Block {

    private static oldPasswordInput: string = new FormInputPassword({
        name: "oldPassword",
        value: "",
        label: "Old Password"
    }).getContentAsText();

    private static newPasswordInput: string = new FormInputPassword({
        name: "newPassword",
        value: "",
        label: "New Password"
    }).getContentAsText();

    private static verifyNewPasswordInput: string = new FormInputPassword({
        name: "verify_password",
        value: "",
        label: "Re-enter New password"
    }).getContentAsText();

    private static saveButton: string = new FormButton({
        text: "Save",
        isPrimary: true
    }).getContentAsText();

    private static backLink: string = new FormLink({
        text: "Back to Account info",
        href: "#account"
    }).getContentAsText();

    constructor() {
        super("div", {
            oldPasswordInput: ChangePasswordPage.oldPasswordInput,
            newPasswordInput: ChangePasswordPage.newPasswordInput,
            verifyNewPasswordInput: ChangePasswordPage.verifyNewPasswordInput,
            saveButton: ChangePasswordPage.saveButton,
            backLink: ChangePasswordPage.backLink
        }, { classes: ["dialog-wrapper"] });
    }

    formValidation: FormValidation;
    user: User;

    componentRendered(): void {
        this.formValidation = new FormValidation("form.changepassword-dialog");

        this.formValidation.setValidation("oldPassword");
        this.formValidation.setValidation("newPassword");
        this.formValidation.setValidation("verify_password", { "Passwords should match": (value) => { return value != this.formValidation.field("newPassword").value; } });

        getAuthServer().auth().then((data) => {
            this.user = new User(JSON.parse(data.response) as UserDataType);
            console.log("User successfully obtained, user = ", this.user);
        }).catch((error) => {
            console.log("User data is not available, error = ", error);
            router.go("#login");
        });

        const updatePassword = () => {
            if (!this.formValidation.checkFormValidity()) {
                console.log("Form is invalid");
                this.formValidation.showErrors();
            } else {
                console.log('Changing password, data: ', JSON.stringify(this.formValidation.values));
                getUserServer().changePassword(this.formValidation.values.oldPassword, this.formValidation.values.newPassword).then((data) => {
                    console.log("user password changed successfully, data = ", data);
                    alert("Success!");
                }).catch((error) => {
                    console.log("error changing password, error = ", error);
                    alert("Error: " + JSON.stringify(error.response));
                }).finally(() => {
                    this.clearData();
                });
            }
        }
        this.getContent().querySelector('.button-submit').addEventListener('click', updatePassword);
    }

    clearData() {
        this.formValidation.discardChanges();
    }

    render() {
        return template({
            oldPasswordInput: this.props.oldPasswordInput,
            newPasswordInput: this.props.newPasswordInput,
            verifyNewPasswordInput: this.props.verifyNewPasswordInput,
            saveButton: this.props.saveButton,
            backLink: this.props.backLink
        });
    }
}
