import axios from 'axios';

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
    response => response
)

export default instance;