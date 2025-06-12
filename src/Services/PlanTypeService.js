import axios from 'axios';

const API_URL = 'http://localhost:8080/api/plan-types';

export const getAllPlanTypes = () => axios.get(API_URL);

export const getPlanTypeById = (id) => axios.get(`${API_URL}/${id}`);

export const createPlanType = (type) => axios.post(API_URL, type);

export const updatePlanType = (id, type) => axios.put(`${API_URL}/${id}`, type);

export const deletePlanType = (id) => axios.delete(`${API_URL}/${id}`);
