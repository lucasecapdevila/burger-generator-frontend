import { Ingredient, CreateIngredientRequest } from '@/types';
import { apiService } from './api';

export const ingredientsService = {
  getAllIngredients: async (): Promise<Ingredient[]> => {
    try {
      const response = await apiService.get<Ingredient[]>('/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      throw error;
    }
  },
  getIngredientById: async (id: string): Promise<Ingredient> => {
    try {
      const response = await apiService.get<Ingredient>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el ingrediente:', error);
      throw error;
    }
  },
  createIngredient: async (ingredient: CreateIngredientRequest): Promise<Ingredient> => {
    try {
      const response = await apiService.post<Ingredient>('/', ingredient);
      return response.data;
    } catch (error) {
      console.error('Error al crear el ingrediente:', error);
      throw error;
    }
  },
}