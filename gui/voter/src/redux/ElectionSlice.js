import { createSlice } from '@reduxjs/toolkit'

export const ElectionSlice = createSlice({
  name: 'election',
  initialState: {
    listNumberRedux: 231,
    electedPeopleRedux: [],
  },
  reducers: {
    setListNumberRedux: (state, action) => {
        state.listNumberRedux = action.payload;
    },
    setElectedPeopleRedux: (state, action) => {
        state.electedPeopleRedux = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setListNumberRedux, setElectedPeopleRedux } = ElectionSlice.actions

export default ElectionSlice.reducer