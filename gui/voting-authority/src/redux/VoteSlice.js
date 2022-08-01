import { createSlice } from '@reduxjs/toolkit'

export const VoteSlice = createSlice({
  name: 'vote',
  initialState: {
    name: "",
    questions: [],
    type: ""
  },
  reducers: {
    setVoteName: (state, action) => {
        state.name = action.payload;
    },
    setVoteQuestion: (state, action) => {
        state.questions = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
  }
  }
})

// Action creators are generated for each case reducer function
export const { setVoteName, setVoteQuestion, setType } = VoteSlice.actions

export default VoteSlice.reducer