import { Ingredient, CreateIngredientRequest } from '@/types';
import { apiService } from './api';

export const ingredientsService = {
  getAllIngredients: async (): Promise<Ingredient[]> => {
    try {
      const ingredients = await apiService.get<Ingredient[]>('/api/ingredients');
      return ingredients || [];
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      throw error;
    }
  },
  getIngredientById: async (id: string): Promise<Ingredient> => {
    try {
      const ingredient = await apiService.get<Ingredient>(`/api/ingredients/${id}`);
      return ingredient;
    } catch (error) {
      console.error('Error al obtener el ingrediente:', error);
      throw error;
    }
  },
  createIngredient: async (ingredient: CreateIngredientRequest): Promise<Ingredient> => {
    try {
      const newIngredient = await apiService.post<Ingredient>('/api/ingredients', ingredient);
      return newIngredient;
    } catch (error) {
      console.error('Error al crear el ingrediente:', error);
      throw error;
    }
  },
}