import axios from 'axios';
import { Message } from 'element-react';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
});

instance.interceptors.request.use(
    config => {
        // config.headers['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
)

instance.interceptors.response.use(
    response => response,
    error => {
        error.response.data.fieldErrors.password.map(error =>
            Message({
                message: error,
                type: "error"
            })
        );
    }
)

export default instance;