import { configureStore } from '@reduxjs/toolkit'
import calculatorSlice from "./calculatorSlice";

export const store = configureStore({
  reducer: {
    calculator: calculatorSlice
  },
})