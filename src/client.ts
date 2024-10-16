import axios, { AxiosInstance } from "axios";

export class Client {
  serverURL: string;
  key: string;
  client: AxiosInstance;

  constructor(serverURL: string, key: string) {
    this.serverURL = serverURL;
    this.key = key;
    this.client = axios.create({
      baseURL: serverURL,
      timeout: 1000,
      headers: { api_key: key },
      withCredentials: true,
    });
  }
}
