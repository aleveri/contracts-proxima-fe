import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://localhost:7179/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    const { response } = err;

    if (response) {
      const status = response.status;
      const data = response.data;

      if (status === 400 && Array.isArray(data?.errors)) {
        data.errors.forEach((e: string) => toast.error(e));
      } else if (status === 500) {
        if (Array.isArray(data?.errors)) {
          data.errors.forEach((e: string) => toast.error(`Error interno: ${e}`));
        } else {
          toast.error("Error interno del servidor.");
        }
      }
    } else {
      toast.error("No se pudo conectar con el servidor.");
    }

    return Promise.reject(err);
  }
);

export default api;