import axios from "axios";
import url from "url";

export class Connection {
    constructor() {}

    public reqestToken(code: string): Promise<any> {
        const params = new url.URLSearchParams({grant_type: "authorization_code", client_id: "", code: code})
        return axios.post("https://www.bungie.net/platform/app/oauth/token/", params.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});
    }
}