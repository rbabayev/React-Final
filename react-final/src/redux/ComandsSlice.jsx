import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  meals: [],
  cart: [],
  currentType: "breakfast",
  selectedMealId: null,
  cartItemCount: 0,
  status: "idle",
  error: null,
};

export const fetchMeals = createAsyncThunk("meal/fetchMeals", async () => {
  const response = await axios.get("http://localhost:3001/meals");
  return response.data;
});

export const commandsSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
    setCurrentType: (state, action) => {
      state.currentType = action.payload;
    },
    increment: (state) => {
      state.meals.forEach((meal) => (meal.id += 1));
    },
    decrement: (state) => {
      state.meals.forEach((meal) => (meal.id -= 1));
    },
    addToCart: (state, action) => {
      const existingMeal = state.cart.find(
        (meal) => meal.id === action.payload.id
      );
      if (existingMeal) {
        existingMeal.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.cartItemCount += 1;
    },
    removeFromCart: (state, action) => {
      const existingMeal = state.cart.find(
        (meal) => meal.id === action.payload
      );
      if (existingMeal && existingMeal.quantity > 1) {
        existingMeal.quantity -= 1;
      } else {
        state.cart = state.cart.filter((meal) => meal.id !== action.payload);
      }
      state.cartItemCount = Math.max(0, state.cartItemCount - 1);
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartItemCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentType,
  increment,
  decrement,
  addToCart,
  removeFromCart,
  clearCart,
} = commandsSlice.actions;
export default commandsSlice.reducer;
