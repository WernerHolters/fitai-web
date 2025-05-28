import axios from 'axios';

const API_URL = 'http://localhost:8080/api/recipe-steps';

export const getAllRecipeSteps = () => axios.get(API_URL);

export const getRecipeStepById = (id) => axios.get(`${API_URL}/${id}`);

export const createRecipeStep = (step) => axios.post(API_URL, step);

export const updateRecipeStep = (id, step) => axios.put(`${API_URL}/${id}`, step);

export const deleteRecipeStep = (id) => axios.delete(`${API_URL}/${id}`);
