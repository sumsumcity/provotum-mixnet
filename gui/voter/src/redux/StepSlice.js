import { createSlice } from '@reduxjs/toolkit'

export const StepSlice = createSlice({
  name: 'step',
  initialState: {
    value: "Vote Creation"
  },
  reducers: {
    advance: state => {
      if (state.value === "Vote Creation"){
        state.value = "Key Generation"
      }
      else if (state.value === "Key Generation"){
        state.value = "Voting"
      }
      else if (state.value === "Voting"){
        state.value = "Tallying"
      }
      else if (state.value === "Tallying"){
        state.value = "Result"
      }
      else if (state.value === "Result"){
        state.value = "Vote Creation"
      }
    },
    setStep: (state, action) => {
      state.value = action.payload;
  }
  }
})

// Action creators are generated for each case reducer function
export const { advance, setStep } = StepSlice.actions

export default StepSlice.reducer