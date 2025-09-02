import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.0.2.2:5000/api/users',
});

export const forgotPassword = email => API.post('/forgotpassword', { email });

export const resetPassword = (token, password) =>
  API.post(`/resetpassword/${token}`, { password });

export default API;
