import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getProducts = () => API.get('/products');
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
