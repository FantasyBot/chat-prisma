import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token');

const initialState = {
  name: token ? jwt_decode(token).name : '',
  email: token ? jwt_decode(token).email : '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    // action => actionHandler

    userLoggedIn: (user, action) => {
      const { name, email } = action.payload;
      user.email = email;
      user.name = name;
    },

    userRegistered: (user, action) => {
      const { name, email } = action.payload;
      user.name = name;
      user.email = email;
    },

    userLoggedOut: (user) => {
      localStorage.removeItem('token');
      user.name = '';
      user.email = '';
    },

    userGotProfileInfo: (user, action) => {
      //   user.userEmail = action.payload.email;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  userRegistered,
  userGotProfileInfo,
} = userSlice.actions;
export default userSlice.reducer;
