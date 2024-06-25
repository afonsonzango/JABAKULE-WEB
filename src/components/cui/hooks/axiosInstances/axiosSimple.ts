import axios from 'axios';

const axiosSimple = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000
});

export default axiosSimple;
