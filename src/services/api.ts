import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

// Configuración base para las llamadas a la API
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:4001';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Factory function to create API service
const createApiService = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para manejar respuestas
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      console.error('API request failed:', error);
      return Promise.reject(error);
    }
  );

  const request = async <T>(
    config: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance(config);
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  return {
    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
      return request<T>({
        method: 'GET',
        url: endpoint,
        ...config,
      });
    },

    async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
      return request<T>({
        method: 'POST',
        url: endpoint,
        data,
        ...config,
      });
    }
  };
};

export const apiService = createApiService(); 