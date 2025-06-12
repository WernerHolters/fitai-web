import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ai';

export const askUser = (userId, pregunta) =>
  axios.post(`${API_URL}/ask-user?userId=${userId}`, pregunta, {
    headers: { 'Content-Type': 'text/plain' }
  });