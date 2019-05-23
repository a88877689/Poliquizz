import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://339d1851-8182-47de-975f-1e50a1a7a505.mock.pstmn.io',
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