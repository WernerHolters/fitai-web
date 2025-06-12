import axios from 'axios';

const API_URL = 'http://localhost:8080/api/muscle-groups';

export const getAllMuscleGroups = () => axios.get(API_URL);

export const getMuscleGroupById = (id) => axios.get(`${API_URL}/${id}`);

export const createMuscleGroup = (group) => axios.post(API_URL, group);

export const updateMuscleGroup = (id, group) => axios.put(`${API_URL}/${id}`, group);

export const deleteMuscleGroup = (id) => axios.delete(`${API_URL}/${id}`);
