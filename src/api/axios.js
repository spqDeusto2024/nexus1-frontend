import axios from 'axios';

// Configura Axios con la URL base de tu API
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Cambia esto si tu backend tiene otra URL base
  headers: {
     // Configuración estándar
  },
});

// **Interceptor de solicitud**: Agrega el token de autenticación automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header
  }

  if (config.url === '/auth/login') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // Para login
  } else {
    config.headers['Content-Type'] = 'application/json'; // Para otras solicitudes JSON
  }
  return config; // Devuelve la configuración actualizada
}, (error) => {
  // Maneja errores en la solicitud, si los hay
  return Promise.reject(error);
});

// **Interceptor de respuesta**: Maneja errores globalmente
apiClient.interceptors.response.use(
  (response) => response, // Devuelve la respuesta si no hay errores
  (error) => {
    if (error.response && error.response.status === 401) {
      // Error 401: Token inválido o expirado
      localStorage.removeItem('token'); // Elimina el token del almacenamiento local
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error); // Devuelve el error para manejarlo localmente si es necesario
  }
);

export default apiClient; // Exporta el cliente configurado
