import axios from 'axios';

const API_URL = 'http://localhost:8080/api/exercise-records';

export const getAllExerciseRecords = () => axios.get(API_URL);

export const getExerciseRecordById = (id) => axios.get(`${API_URL}/${id}`);

export const createExerciseRecord = (record) => axios.post(API_URL, record);

export const updateExerciseRecord = (id, record) => axios.put(`${API_URL}/${id}`, record);

export const deleteExerciseRecord = (id) => axios.delete(`${API_URL}/${id}`);
