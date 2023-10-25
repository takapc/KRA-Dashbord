import axios from "axios";
import { KraUser } from "./types";

export class KraApiClient {
    endpoint: string;
    constructor() {
        this.endpoint = "https://kra-japan.com/api/v1";
    }
    async getUsers(): Promise<KraUser[]> {
        return await axios
            .get(`${this.endpoint}/users`)
            .then((res) => res.data);
    }
}
