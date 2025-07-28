export interface Ingredient {
  _id: string;
  name: string;
  category: 'Pan' | 'Carne' | 'Queso' | 'Vegetales' | 'Salsas' | 'Extras' | 'Bebidas' | 'Otros';
  price: number;
  calories: number;
  stock: number;
  description?: string;
  img?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateIngredientRequest {
  name: string;
  category: 'Pan' | 'Carne' | 'Queso' | 'Vegetales' | 'Salsas' | 'Extras' | 'Bebidas' | 'Otros';
  price: number;
  calories: number;
  stock: number;
  description?: string;
  img?: string;
}

// Define the state interface
export interface ExampleState {
  value: number;
  items: string[];
  loading: boolean;
}

// Define the step types for navigation
export type StepType = 'pan' | 'carne' | 'queso' | 'vegetales' | 'salsas' | 'otros' | 'extras' | 'bebidas';