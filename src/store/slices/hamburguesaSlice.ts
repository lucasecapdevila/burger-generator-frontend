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

const hamburguesaSlice = createSlice({
  name: 'hamburguesa',
  initialState,
  reducers: {
    // Acciones para ingredientes únicos (pan, carne, queso)
    setPan: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.pan = action.payload;
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    setCarne: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.carne = action.payload;
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    setQueso: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.queso = action.payload;
      // For melted cheese, set quantity to 1 automatically
      if (isMeltedCheese(action.payload)) {
        state.quesoCantidad = 1;
      } else {
        state.quesoCantidad = 0; // Reset to 0 for regular cheese
      }
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    removerQueso: (state) => {
      state.ingredientes.queso = undefined;
      state.quesoCantidad = 0;
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    
    // Acción para cambiar la cantidad de carne
    setCarneCantidad: (state, action: PayloadAction<number>) => {
      state.carneCantidad = Math.max(1, Math.min(4, action.payload));
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    
    // Acción para cambiar la cantidad de queso (only for non-melted cheese)
    setQuesoCantidad: (state, action: PayloadAction<number>) => {
      // Only allow quantity changes for non-melted cheese
      if (state.ingredientes.queso && !isMeltedCheese(state.ingredientes.queso)) {
        state.quesoCantidad = Math.max(0, Math.min(4, action.payload));
        state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
        state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      }
    },
    
    // Acciones para ingredientes múltiples (vegetales, salsas, extras, bebidas, otros)
    agregarVegetal: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.vegetales.push(action.payload);
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    removerVegetal: (state, action: PayloadAction<string>) => {
      state.ingredientes.vegetales = state.ingredientes.vegetales.filter(
        veg => veg._id !== action.payload
      );
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    limpiarVegetales: (state) => {
      state.ingredientes.vegetales = [];
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    
    agregarSalsa: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.salsas.push(action.payload);
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    removerSalsa: (state, action: PayloadAction<string>) => {
      state.ingredientes.salsas = state.ingredientes.salsas.filter(
        salsa => salsa._id !== action.payload
      );
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    limpiarSalsas: (state) => {
      state.ingredientes.salsas = [];
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    
    agregarExtra: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.extras.push(action.payload);
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    removerExtra: (state, action: PayloadAction<string>) => {
      state.ingredientes.extras = state.ingredientes.extras.filter(
        extra => extra._id !== action.payload
      );
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    limpiarExtras: (state) => {
      state.ingredientes.extras = [];
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    
    agregarBebida: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.bebidas.push(action.payload);
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    removerBebida: (state, action: PayloadAction<string>) => {
      state.ingredientes.bebidas = state.ingredientes.bebidas.filter(
        bebida => bebida._id !== action.payload
      );
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    limpiarBebidas: (state) => {
      state.ingredientes.bebidas = [];
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    
    agregarOtro: (state, action: PayloadAction<Ingredient>) => {
      state.ingredientes.otros.push(action.payload);
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    removerOtro: (state, action: PayloadAction<string>) => {
      state.ingredientes.otros = state.ingredientes.otros.filter(
        otro => otro._id !== action.payload
      );
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
    },
    limpiarOtros: (state) => {
      state.ingredientes.otros = [];
      state.precioTotal = calcularPrecioTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
      state.caloriasTotal = calcularCaloriasTotal(state.ingredientes, state.carneCantidad, state.quesoCantidad);
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