import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cooking-methods';

export const getAllCookingMethods = () => axios.get(API_URL);

export const getCookingMethodById = (id) => axios.get(`${API_URL}/${id}`);

export const createCookingMethod = (method) => axios.post(API_URL, method);

export const updateCookingMethod = (id, method) => axios.put(`${API_URL}/${id}`, method);

export const deleteCookingMethod = (id) => axios.delete(`${API_URL}/${id}`);
