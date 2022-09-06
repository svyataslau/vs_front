import axios from 'axios';

export const apiUrl = axios.create({
  baseURL: process.env.VUE_APP_API_DEFAULT_URL,
});
