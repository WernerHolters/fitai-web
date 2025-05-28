import axios from 'axios';

const API_URL = 'http://localhost:8080/api/meal-plan-variants';

export const getAllMealPlanVariants = () => axios.get(API_URL);

export const getMealPlanVariantById = (id) => axios.get(`${API_URL}/${id}`);

export const createMealPlanVariant = (variant) => axios.post(API_URL, variant);

export const updateMealPlanVariant = (id, variant) => axios.put(`${API_URL}/${id}`, variant);

export const deleteMealPlanVariant = (id) => axios.delete(`${API_URL}/${id}`);
