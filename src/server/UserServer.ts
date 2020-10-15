import { User, UserDataType } from "../business/User";
import { APIServer, HTTPResponse } from "./APIServer";

export class UserServer extends APIServer {

    getUser(id: string): Promise<HTTPResponse> {
        return this.get("/user/" + id);
    }

    update(userData: UserDataType): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        if (!userData.display_name) {
            userData.display_name = userData.first_name + " " + userData.second_name;
        }
        return this.put("/user/profile", { data: userData, headers: headers });
    }

    changePassword(oldPassword: string, newPassword: string): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        return this.put("/user/password", { data: {oldPassword: oldPassword, newPassword}, headers: headers });
    }

    changeAvatar(formData: FormData): Promise<HTTPResponse> {
        return this.put("/user/profile/avatar", { data: formData });
    }
}
