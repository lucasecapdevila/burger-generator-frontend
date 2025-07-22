import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientes: [],
}

const ingredientesSlice = createSlice({
  name: 'ingredientes',
  initialState,
  reducers: {
    setIngredientes: (state, action) => {
      state.ingredientes = action.payload;
    },
  },
})

export const { setIngredientes } = ingredientesSlice.actions;
export default ingredientesSlice.reducer;