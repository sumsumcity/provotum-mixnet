import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    obj: null,
  },
  reducers: {
    setUserObj: (state, action) => {
        state.obj = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserObj } = UserSlice.actions

export default UserSlice.reducer