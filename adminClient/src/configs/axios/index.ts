import axios from "axios";

const baseUrl = "https://server.dynotxt.com/auth/su";

export const authBackend = axios.create({ baseURL: baseUrl, withCredentials: true });
