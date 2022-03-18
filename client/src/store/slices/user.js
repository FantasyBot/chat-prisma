import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token');
const image_url = localStorage.getItem('image_url');


const initialState = {
  name: token ? jwt_decode(token).name : '',
  email: token ? jwt_decode(token).email : '',
  image_url: image_url || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    // action => actionHandler

    userLoggedIn: (user, action) => {
      const { name, email, image_url} = action.payload;
      user.email = email;
      user.name = name;
      user.image_url = image_url;
    },

    userRegistered: (user, action) => {
      const { name, email } = action.payload;
      user.name = name;
      user.email = email;
      // user.image_url = image_url;
    },

    userLoggedOut: (user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('image_url');
      user.name = '';
      user.email = '';
      user.image_url = '';
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
