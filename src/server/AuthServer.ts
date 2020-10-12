import { APIServer, HTTPResponse } from "./APIServer";
import { User } from "../business/User";

export class AuthServer extends APIServer {

    signup(user: User): Promise<HTTPResponse> {
        let headers = {"content-type": "application/json"};
        return this.post("/auth/signup", {data: user.json(), headers: headers});
    }
}
