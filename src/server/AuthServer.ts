import { APIServer, HTTPResponse } from "./APIServer";
import { User } from "../business/User";

export class AuthServer extends APIServer {

    signup(user: User): Promise<HTTPResponse> {
        const headers = {"content-type": "application/json"};
        return this.post("/auth/signup", {data: user.json(), headers: headers});
    }

    signin(login: string, password: string): Promise<HTTPResponse> {
        const headers = {"content-type": "application/json"};
        return this.post("/auth/signin", {data: {"login": login, "password": password}, headers: headers});
    }

    auth(): Promise<HTTPResponse> {
        return this.get("/auth/user");
    }

    logout(): Promise<HTTPResponse> {
        return this.post("/auth/logout");
    }
}
