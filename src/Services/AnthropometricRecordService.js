import axios from 'axios';

const API_URL = 'http://localhost:8080/api/anthropometric-records';

export const getAllAnthropometricRecords = () => axios.get(API_URL);

export const getAnthropometricRecordById = (id) => axios.get(`${API_URL}/${id}`);

export const createAnthropometricRecord = (record) => axios.post(API_URL, record);

export const updateAnthropometricRecord = (id, record) => axios.put(`${API_URL}/${id}`, record);

export const deleteAnthropometricRecord = (id) => axios.delete(`${API_URL}/${id}`);
