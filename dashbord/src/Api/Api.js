import axios from "axios";
//
const API_URL = axios.create({ baseURL: "http://localhost:2729",});

API_URL.interceptors.request.use((req) => {
        if (localStorage.getItem("Userprofile")) {
        req.headers.authorization = `Bearer${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
},
    (error) => Promise.reject(error)
);

export default API_URL;

