// src/services/UserService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const getAllUsers = () => axios.get(API_URL).then(res => res.data);

export const getUserById = (id) => axios.get(`${API_URL}/${id}`).then(res => res.data);

export const createUser = (data) => axios.post(API_URL, data).then(res => res.data);

export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data).then(res => res.data);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
