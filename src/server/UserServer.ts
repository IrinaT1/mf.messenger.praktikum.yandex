import { User } from "../business/User";
import { APIServer, HTTPResponse } from "./APIServer";

export class UserServer extends APIServer {

    getUser(id: string): Promise<HTTPResponse> {
        return this.get("/user/" + id);
    }

    update(user: User): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        if (!user.data.display_name) {
            user.data.display_name = user.data.first_name + " " + user.data.second_name;
        }
        return this.put("/user/profile", { data: user.data, headers: headers });
    }

    changePassword(oldPassword: string, newPassword: string): Promise<HTTPResponse> {
        const headers = { "content-type": "application/json" };
        return this.put("/user/password", { data: {oldPassword: oldPassword, newPassword}, headers: headers });
    }
}
