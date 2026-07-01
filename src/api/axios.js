// axios package
import axios from "axios";

// backend url
const api = axios.create({
    baseURL: "http://localhost:5038/api", // badal port-kaaga
});

export default api;