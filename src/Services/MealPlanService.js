import axios from 'axios';

const API_URL = 'http://localhost:8080/api/meal-plans';

export const getAllMealPlans = () => axios.get(API_URL);

export const getMealPlanById = (id) => axios.get(`${API_URL}/${id}`);

export const createMealPlan = (plan) => axios.post(API_URL, plan);

export const updateMealPlan = (id, plan) => axios.put(`${API_URL}/${id}`, plan);

export const deleteMealPlan = (id) => axios.delete(`${API_URL}/${id}`);
