import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user-progress';

export const getAllUserProgress = () => axios.get(API_URL);

export const getUserProgressById = (id) => axios.get(`${API_URL}/${id}`);

export const createUserProgress = (progress) => axios.post(API_URL, progress);

export const updateUserProgress = (id, progress) => axios.put(`${API_URL}/${id}`, progress);

export const deleteUserProgress = (id) => axios.delete(`${API_URL}/${id}`);
