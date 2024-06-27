import axios from 'axios';

const axiosAuthed = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.NEXT_PUBLIC_API_KEY,
    },
});

export default axiosAuthed;
