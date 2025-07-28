import { configureStore } from "@reduxjs/toolkit";
import hamburguesaReducer from "./slices/hamburguesaSlice";

export const store = configureStore({
  reducer: {
    hamburguesa: hamburguesaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;