import axios from "axios";

const baseURL = "https://server.dynotxt.com";

export const authBackend = axios.create({ baseURL: `${baseURL}/auth/api/v1`, withCredentials: true });
export const blogBackend = axios.create({ baseURL: `${baseURL}/blog/api/v1` });
