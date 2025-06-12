import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/recipes';

export const getAllRecipes = () => axios.get(BASE_URL);

export const getRecipeById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createRecipe = (data) => axios.post(BASE_URL, data);

export const updateRecipe = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteRecipe = (id) => axios.delete(`${BASE_URL}/${id}`);
