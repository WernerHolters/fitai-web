import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/dishes';

export const getAllDishes = () => axios.get(BASE_URL);
