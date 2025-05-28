import axios from 'axios';

const API_URL = 'http://localhost:8080/api/workout-plan-exercises';

export const getAllWorkoutPlanExercises = () => axios.get(API_URL);

export const getWorkoutPlanExerciseById = (id) => axios.get(`${API_URL}/${id}`);

export const createWorkoutPlanExercise = (planExercise) => axios.post(API_URL, planExercise);

export const updateWorkoutPlanExercise = (id, planExercise) => axios.put(`${API_URL}/${id}`, planExercise);

export const deleteWorkoutPlanExercise = (id) => axios.delete(`${API_URL}/${id}`);
