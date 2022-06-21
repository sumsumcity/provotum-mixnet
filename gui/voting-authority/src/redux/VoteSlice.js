import { createSlice } from '@reduxjs/toolkit'

export const VoteSlice = createSlice({
  name: 'vote',
  initialState: {
    name: "",
    questions: []
  },
  reducers: {
    setVoteName: (state, action) => {
        state.name = action.payload;
    },
    setVoteQuestion: (state, action) => {
        state.questions.push(action.payload);
    }
  }
})

// Action creators are generated for each case reducer function
export const { setVoteName, setVoteQuestion } = VoteSlice.actions

export default VoteSlice.reducer