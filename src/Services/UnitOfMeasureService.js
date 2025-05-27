import axios from 'axios';

const API_URL = 'http://localhost:8080/api/units-of-measure';

export const getAllUnits = () => axios.get(API_URL);

export const getUnitById = (id) => axios.get(`${API_URL}/${id}`);

export const createUnit = (unit) => axios.post(API_URL, unit);

export const updateUnit = (id, unit) => axios.put(`${API_URL}/${id}`, unit);

export const deleteUnit = (id) => axios.delete(`${API_URL}/${id}`);
