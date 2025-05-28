import axios from 'axios';

const API_URL = 'http://localhost:8080/api/exercises';

export const getAllExercises = () => axios.get(API_URL);

export const getExerciseById = (id) => axios.get(`${API_URL}/${id}`);

export const createExercise = (exercise) => axios.post(API_URL, exercise);

export const updateExercise = (id, exercise) => axios.put(`${API_URL}/${id}`, exercise);

export const deleteExercise = (id) => axios.delete(`${API_URL}/${id}`);
