import axios from 'axios';

const API_URL = 'http://localhost:8080/api/workout-plans';

export const getAllWorkoutPlans = () => axios.get(API_URL);

export const getWorkoutPlanById = (id) => axios.get(`${API_URL}/${id}`);

export const createWorkoutPlan = (plan) => axios.post(API_URL, plan);

export const updateWorkoutPlan = (id, plan) => axios.put(`${API_URL}/${id}`, plan);

export const deleteWorkoutPlan = (id) => axios.delete(`${API_URL}/${id}`);
