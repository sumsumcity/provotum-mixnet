import { createSlice } from '@reduxjs/toolkit'

export const BallotSlice = createSlice({
  name: 'ballot',
  initialState: {
    votes: [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
  },
  reducers: {
    setVotes: (state, action) => {
        state.votes = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setVotes } = BallotSlice.actions

export default BallotSlice.reducer