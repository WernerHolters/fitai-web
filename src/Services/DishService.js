import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dishes';

export const getAllDishes = () => axios.get(API_URL);

export const getDishById = (id) => axios.get(`${API_URL}/${id}`);

export const createDish = (data) => axios.post(API_URL, data);

export const updateDish = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteDish = (id) => axios.delete(`${API_URL}/${id}`);
