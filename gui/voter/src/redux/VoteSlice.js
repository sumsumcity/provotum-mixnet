import { createSlice } from '@reduxjs/toolkit'

export const VoteSlice = createSlice({
  name: 'vote',
  initialState: {
    obj: null,
    questions: []
  },
  reducers: {
    setVoteObj: (state, action) => {
        state.obj = action.payload;
    },
    setVoteQuestion: (state, action) => {
        state.questions = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setVoteObj, setVoteQuestion } = VoteSlice.actions

export default VoteSlice.reducer