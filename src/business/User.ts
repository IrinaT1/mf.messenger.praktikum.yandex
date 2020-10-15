import { ApiServerUrl } from "../server/Server";

export type UserDataType = {
    id?: string;
    first_name: string;
    second_name: string;
    display_name?: string;
    login: string;
    password?: string;
    email: string;
    phone: string;
    avatar?: string;
}

export class User {

    public data: UserDataType;

    constructor(data: UserDataType) {
        if (data.avatar) {
            const url = new URL(ApiServerUrl);
            console.log("url = ", url);
            data.avatar = url.protocol + "//" + url.host + data.avatar;
        }
        this.data = data;
    }

    json() {
        return this.data;
    }

    static create(data: UserDataType): User {
        const json = data;

        return new this(json);
    }
}
