// frontend/src/services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3600', // Corrigido para a porta correta
});

export default api;