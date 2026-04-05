import axios from 'axios';

//Point all requests at the Express server.
//In production this will be your Railway URL (ser via .env).
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    headers: {'Content-Type': 'application/json' },
});

export default api;