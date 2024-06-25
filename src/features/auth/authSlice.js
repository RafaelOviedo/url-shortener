import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: {
      id: 1,
      group_id: 1,
      email: 'test@mail.com',
      dates_bucket: [
        'June 20, 2024',
        'June 25, 2024',
        'July 9, 2024',
        'July 18, 2024'
      ],
      created_at: '2024-06-08T17:36:43.991Z',
      updated_at: '2024-06-08T18:50:10.965Z'
    },
  },
  reducers: {
    setUser: (state, payload) => {
      state.user = payload.payload.user;
      state.token = payload.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;