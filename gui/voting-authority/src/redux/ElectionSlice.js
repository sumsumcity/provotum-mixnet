import { createSlice } from '@reduxjs/toolkit'

export const ElectionSlice = createSlice({
  name: 'election',
  initialState: {
    numberOfSeats: 1,
    listOfAllElectionListMembers: []
  },
  reducers: {
    setNumberOfSeats: (state, action) => {
        state.numberOfSeats = action.payload;
    },
    setListOfAllElectionListMembers: (state, action) => {
        state.listOfAllElectionListMembers = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setNumberOfSeats, setListOfAllElectionListMembers } = ElectionSlice.actions

export default ElectionSlice.reducer