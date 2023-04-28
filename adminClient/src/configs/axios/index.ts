import axios from "axios";

const baseUrl = "https://server.dynotxt.com";

export const authBackend = axios.create({ baseURL: `${baseUrl}/auth/su/api/v1/`, withCredentials: true });
