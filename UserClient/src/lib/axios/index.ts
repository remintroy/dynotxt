import axios from "axios";

const baseURL = "https://server.dynotxt.com";

export const blogBackend = axios.create({ baseURL: `${baseURL}/blog/api/v1` });
