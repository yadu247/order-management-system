import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async credentials => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  console.log('Login API Response:', data);
  return data;
};

export const register = async userData => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data;
};
