import { createSlice } from '@reduxjs/toolkit'

export const StepSlice = createSlice({
  name: 'step',
  initialState: {
    value: "Vote Creation"
  },
  reducers: {
    setStep: (state, action) => {
      state.value = action.payload;
  }
  }
})

// Action creators are generated for each case reducer function
export const { advance, setStep } = StepSlice.actions

export default StepSlice.reducer