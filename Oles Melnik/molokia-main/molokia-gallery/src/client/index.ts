import axios from 'axios';

export const baseUrl = 'http://localhost';
export const client = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
});