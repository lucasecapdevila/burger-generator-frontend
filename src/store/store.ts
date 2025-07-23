import { configureStore } from "@reduxjs/toolkit";
import ingredientesReducer from "./slices/ingredientesSlice";
import hamburguesaReducer from "./slices/hamburguesaSlice";

export const store = configureStore({
  reducer: {
    ingredientes: ingredientesReducer,
    hamburguesa: hamburguesaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;