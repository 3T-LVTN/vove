import axios from "axios";

axios.defaults.baseURL = process.env["NX_API_URL"];
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

export {axios};
