import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://223a320d-223e-44fa-9d72-3a1725551d30.mock.pstmn.io',
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