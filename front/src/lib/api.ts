import axios from 'axios';
import { CONFIG } from '@/config/env.config';

export const clienteApi = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

clienteApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token_autenticacion');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

clienteApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Interceptor global de errores
    if (error.response?.status === 401) {
      localStorage.removeItem('token_autenticacion');
      localStorage.removeItem('refresh_token_autenticacion');
      localStorage.removeItem('usuario_autenticado');
      
      // Redireccionar al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
