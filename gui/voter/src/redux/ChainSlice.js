import { createSlice } from '@reduxjs/toolkit'

export const ChainSlice = createSlice({
  name: 'chain',
  initialState: {
    status: "OFF CHAIN"
  },
  reducers: {
    setChainStatus: (state, action) => {
        state.status = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setChainStatus } = ChainSlice.actions

export default ChainSlice.reducer