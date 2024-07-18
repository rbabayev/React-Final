import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "../redux/ComandsSlice";

export const store = configureStore({
  reducer: {
    meal: mealReducer,
  },
});
