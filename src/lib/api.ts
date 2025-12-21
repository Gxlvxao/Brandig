import axios from 'axios';

// Agora ele tenta ler a variável de ambiente do Vite primeiro.
// Se não achar (no seu PC local), usa o localhost como fallback.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Importante para manter a sessão/cookies seguros se precisar no futuro
  withCredentials: true, 
});

// Interceptor para logs de erro (ajuda muito no debug)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);