import { configureStore } from "@reduxjs/toolkit";
import ingredientesReducer from "./slices/ingredientesSlice";

export const store = configureStore({
  reducer: {
    ingredientes: ingredientesReducer,
  },
})