import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/ingredients';

export const getAllIngredients = () => axios.get(BASE_URL);

export const getIngredientById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createIngredient = (data) => axios.post(BASE_URL, data);

export const updateIngredient = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteIngredient = (id) => axios.delete(`${BASE_URL}/${id}`);
