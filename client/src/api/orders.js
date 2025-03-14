import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const getOrders = async (token, page = 1, limit = 5) => {
  const { data } = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createOrder = async (order, token) => {
  const { data } = await axios.post(API_URL, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateOrder = async (id, order, token) => {
  const { data } = await axios.put(`${API_URL}/${id}`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteOrder = async (id, token) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
