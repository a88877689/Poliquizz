import axios from "axios";
 
const instance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    timeout: 5000
});

instance.interceptors.request.use(
    config => {
        config.headers["x-access-token"] = localStorage.getItem("token");
        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "application/json";
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

instance.interceptors.response.use(
    response => response
)

export default instance;