import { configureStore } from '@reduxjs/toolkit'
import stepReducer from "../redux/StepSlice"

export default configureStore({
  reducer: {
    step: stepReducer
  }
})