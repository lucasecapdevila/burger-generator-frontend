import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "@/types";

export interface HamburguesaState {
  ingredientes: {
    pan?: Ingredient;
    carne?: Ingredient;
    queso?: Ingredient;
    vegetales: Ingredient[];
    salsas: Ingredient[];
    extras: Ingredient[];
    bebidas: Ingredient[];
    otros: Ingredient[];
  };
  carneCantidad: number;
  quesoCantidad: number;
  precioTotal: number;
  caloriasTotal: number;
}

const initialState: HamburguesaState = {
  ingredientes: {
    vegetales: [],
    salsas: [],
    extras: [],
    bebidas: [],
    otros: [],
  },
  carneCantidad: 1,
  quesoCantidad: 0,
  precioTotal: 0,
  caloriasTotal: 0,
};

// Helper function to check if cheese is melted cheese
const isMeltedCheese = (queso: Ingredient): boolean => {
  const name = queso.name.toLowerCase();
  return name.includes('fundido') || name.includes('melted') || name.includes('derretido');
};

// Helper function to update totals
const updateTotals = (state: HamburguesaState) => {
  state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
  state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
};

// Helper function to add ingredient to array
const addIngredientToArray = (state: HamburguesaState, array: Ingredient[], ingredient: Ingredient) => {
  array.push(ingredient);
  updateTotals(state);
};

// Helper function to remove ingredient from array
const removeIngredientFromArray = (state: HamburguesaState, array: Ingredient[], id: string) => {
  const index = array.findIndex(item => item._id === id);
  if (index !== -1) {
    array.splice(index, 1);
    updateTotals(state);
  }
};

// Helper function to clear array
const clearArray = (state: HamburguesaState, array: Ingredient[]) => {
  array.length = 0;
  updateTotals(state);
};

const hamburguesaSlice = createSlice({
  name: 'hamburguesa',
  initialState,
  reducers: {
    // Acciones para ingredientes únicos (pan, carne, queso)
    setPan: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.pan = action.payload;
      updateTotals(state);
    },
    setCarne: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.carne = action.payload;
      updateTotals(state);
    },
    setQueso: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.queso = action.payload;
      // For melted cheese, set quantity to 1 automatically
      if (isMeltedCheese(action.payload)) {
        state.quesoCantidad = 1;
      } else {
        state.quesoCantidad = 0; // Reset to 0 for regular cheese
      }
      updateTotals(state);
    },
    removerQueso: (state) => {
      state.ingredientes.queso = undefined;
      state.quesoCantidad = 0;
      updateTotals(state);
    },
    
    // Acción para cambiar la cantidad de carne
    setCarneCantidad: (state, action: PayloadAction<number>) => {
      state.carneCantidad = Math.max(1, Math.min(4, action.payload));
      updateTotals(state);
    },
    
    // Acción para cambiar la cantidad de queso (only for non-melted cheese)
    setQuesoCantidad: (state, action: PayloadAction<number>) => {
      // Only allow quantity changes for non-melted cheese
      if (state.ingredientes.queso && !isMeltedCheese(state.ingredientes.queso)) {
        state.quesoCantidad = Math.max(0, Math.min(4, action.payload));
        updateTotals(state);
      }
    },
    
    // Acciones para ingredientes múltiples
    agregarVegetal: (state, action: PayloadAction<Ingredient>) => {
      addIngredientToArray(state, state.ingredientes.vegetales, action.payload);
    },
    removerVegetal: (state, action: PayloadAction<string>) => {
      removeIngredientFromArray(state, state.ingredientes.vegetales, action.payload);
    },
    limpiarVegetales: (state) => {
      clearArray(state, state.ingredientes.vegetales);
    },
    
    agregarSalsa: (state, action: PayloadAction<Ingredient>) => {
      addIngredientToArray(state, state.ingredientes.salsas, action.payload);
    },
    removerSalsa: (state, action: PayloadAction<string>) => {
      removeIngredientFromArray(state, state.ingredientes.salsas, action.payload);
    },
    limpiarSalsas: (state) => {
      clearArray(state, state.ingredientes.salsas);
    },
    
    agregarExtra: (state, action: PayloadAction<Ingredient>) => {
      addIngredientToArray(state, state.ingredientes.extras, action.payload);
    },
    removerExtra: (state, action: PayloadAction<string>) => {
      removeIngredientFromArray(state, state.ingredientes.extras, action.payload);
    },
    limpiarExtras: (state) => {
      clearArray(state, state.ingredientes.extras);
    },
    
    agregarBebida: (state, action: PayloadAction<Ingredient>) => {
      addIngredientToArray(state, state.ingredientes.bebidas, action.payload);
    },
    removerBebida: (state, action: PayloadAction<string>) => {
      removeIngredientFromArray(state, state.ingredientes.bebidas, action.payload);
    },
    limpiarBebidas: (state) => {
      clearArray(state, state.ingredientes.bebidas);
    },
    
    agregarOtro: (state, action: PayloadAction<Ingredient>) => {
      addIngredientToArray(state, state.ingredientes.otros, action.payload);
    },
    removerOtro: (state, action: PayloadAction<string>) => {
      removeIngredientFromArray(state, state.ingredientes.otros, action.payload);
    },
    limpiarOtros: (state) => {
      clearArray(state, state.ingredientes.otros);
    },
    
    // Acción para limpiar toda la hamburguesa
    limpiarHamburguesa: (state) => {
      state.ingredientes = {
        vegetales: [],
        salsas: [],
        extras: [],
        bebidas: [],
        otros: [],
      };
      state.carneCantidad = 1;
      state.quesoCantidad = 0;
      state.precioTotal = 0;
      state.caloriasTotal = 0;
    },
  },
});

// Funciones auxiliares para calcular totales
const calcularPrecioTotal = (ingredientes: HamburguesaState['ingredientes'], carneCantidad: number, quesoCantidad: number): number => {
  let total = 0;
  
  if (ingredientes.pan) total += ingredientes.pan.price;
  if (ingredientes.carne) total += ingredientes.carne.price * carneCantidad;
  if (ingredientes.queso) {
    // For melted cheese, always use quantity 1
    if (isMeltedCheese(ingredientes.queso)) {
      total += ingredientes.queso.price;
    } else {
      total += ingredientes.queso.price * quesoCantidad;
    }
  }
  
  ingredientes.vegetales.forEach(veg => total += veg.price);
  ingredientes.salsas.forEach(salsa => total += salsa.price);
  ingredientes.extras.forEach(extra => total += extra.price);
  ingredientes.bebidas.forEach(bebida => total += bebida.price);
  ingredientes.otros.forEach(otro => total += otro.price);
  
  return total;
};

const calcularCaloriasTotal = (ingredientes: HamburguesaState['ingredientes'], carneCantidad: number, quesoCantidad: number): number => {
  let total = 0;
  
  if (ingredientes.pan) total += ingredientes.pan.calories;
  if (ingredientes.carne) total += ingredientes.carne.calories * carneCantidad;
  if (ingredientes.queso) {
    // For melted cheese, always use quantity 1
    if (isMeltedCheese(ingredientes.queso)) {
      total += ingredientes.queso.calories;
    } else {
      total += ingredientes.queso.calories * quesoCantidad;
    }
  }
  
  ingredientes.vegetales.forEach(veg => total += veg.calories);
  ingredientes.salsas.forEach(salsa => total += salsa.calories);
  ingredientes.extras.forEach(extra => total += extra.calories);
  ingredientes.bebidas.forEach(bebida => total += bebida.calories);
  ingredientes.otros.forEach(otro => total += otro.calories);
  
  return total;
};

export const { 
  setPan, 
  setCarne, 
  setQueso,
  removerQueso,
  setCarneCantidad,
  setQuesoCantidad,
  agregarVegetal, 
  removerVegetal,
  limpiarVegetales,
  agregarSalsa, 
  removerSalsa,
  limpiarSalsas,
  agregarExtra, 
  removerExtra,
  limpiarExtras,
  agregarBebida,
  removerBebida,
  limpiarBebidas,
  agregarOtro,
  removerOtro,
  limpiarOtros,
  limpiarHamburguesa 
} = hamburguesaSlice.actions;

export default hamburguesaSlice.reducer; 