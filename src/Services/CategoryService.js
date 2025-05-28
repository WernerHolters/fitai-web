import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';

export const getAllCategories = () => axios.get(API_URL);

export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`);

export const createCategory = (category) => axios.post(API_URL, category);

export const updateCategory = (id, category) => axios.put(`${API_URL}/${id}`, category);

export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);
